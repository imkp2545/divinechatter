const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const OTP = require("../models/OTP");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const { isValidEmail, isStrongPassword } = require("../utils/validators");
const asyncHandler = require("../utils/asyncHandler");

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));
const hashOtp = async (otp) => bcrypt.hash(String(otp), await bcrypt.genSalt(10));

const sendOtpEmail = async (email, otp, purpose) => {
  const subject = purpose === "signup" ? "Verify your account (OTP)" : "Reset password OTP";
  const html = `
    <div>
      <h2>${subject}</h2>
      <p>Your OTP is: <b style="font-size:18px">${otp}</b></p>
      <p>This OTP expires in 10 minutes.</p>
    </div>
  `;
  await sendEmail({ to: email, subject, html, text: `OTP: ${otp}` });
};

exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) throw Object.assign(new Error("Name, email, password are required"), { status: 400 });
  if (!isValidEmail(email)) throw Object.assign(new Error("Invalid email"), { status: 400 });
  if (!isStrongPassword(password)) throw Object.assign(new Error("Password must be at least 8 characters"), { status: 400 });

  const normalizedEmail = email.toLowerCase();
  let user = await User.findOne({ email: normalizedEmail });

  if (user && user.isActive) {
    res.status(409);
    throw new Error("Email already registered");
  }

  if (!user) {
    user = await User.create({ name, email: normalizedEmail, password, isActive: false });
  } else {
    user.name = name;
    user.password = password;
    await user.save();
  }

  const otp = generateOtp();
  await OTP.deleteMany({ email: normalizedEmail, purpose: "signup" });
  await OTP.create({
    email: normalizedEmail,
    purpose: "signup",
    otpHash: await hashOtp(otp),
    expiresAt: new Date(Date.now() + 10 * 60 * 1000)
  });

  await sendOtpEmail(normalizedEmail, otp, "signup");

  res.status(201).json({ message: "Signup created. OTP sent to email.", email: normalizedEmail });
});

exports.verifySignupOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!isValidEmail(email) || !otp) {
    res.status(400);
    throw new Error("Email and OTP required");
  }

  const normalizedEmail = email.toLowerCase();
  const entry = await OTP.findOne({ email: normalizedEmail, purpose: "signup" });
  if (!entry || entry.expiresAt < new Date()) {
    res.status(400);
    throw new Error("OTP not found or expired");
  }

  const ok = await bcrypt.compare(String(otp), entry.otpHash);
  if (!ok) {
    entry.attempts += 1;
    await entry.save();
    res.status(400);
    throw new Error("Invalid OTP");
  }

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.isActive = true;
  await user.save();
  await entry.deleteOne();

  const token = generateToken(user._id);
  res.json({ message: "Account verified", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!isValidEmail(email) || !password) {
    res.status(400);
    throw new Error("Email and password required");
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  if (!user.isActive) {
    res.status(403);
    throw new Error("Account not active. Please verify OTP.");
  }

  const ok = await user.matchPassword(password);
  if (!ok) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!isValidEmail(email)) {
    res.status(400);
    throw new Error("Valid email required");
  }

  const normalizedEmail = email.toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) return res.json({ message: "If the email exists, OTP was sent." });

  const otp = generateOtp();
  await OTP.deleteMany({ email: normalizedEmail, purpose: "forgot" });
  await OTP.create({
    email: normalizedEmail,
    purpose: "forgot",
    otpHash: await hashOtp(otp),
    expiresAt: new Date(Date.now() + 10 * 60 * 1000)
  });

  await sendOtpEmail(normalizedEmail, otp, "forgot");
  res.json({ message: "If the email exists, OTP was sent." });
});

exports.verifyForgotOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!isValidEmail(email) || !otp) {
    res.status(400);
    throw new Error("Email and OTP required");
  }

  const normalizedEmail = email.toLowerCase();
  const entry = await OTP.findOne({ email: normalizedEmail, purpose: "forgot" });
  if (!entry || entry.expiresAt < new Date()) {
    res.status(400);
    throw new Error("OTP not found or expired");
  }

  const ok = await bcrypt.compare(String(otp), entry.otpHash);
  if (!ok) {
    res.status(400);
    throw new Error("Invalid OTP");
  }

  const resetToken = crypto.randomBytes(24).toString("hex");
  entry.otpHash = await hashOtp(resetToken);
  entry.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await entry.save();

  res.json({ message: "OTP verified", resetToken });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { email, resetToken, newPassword } = req.body;

  if (!isValidEmail(email) || !resetToken || !newPassword) {
    res.status(400);
    throw new Error("Email, resetToken, newPassword required");
  }
  if (!isStrongPassword(newPassword)) {
    res.status(400);
    throw new Error("Password must be at least 8 characters");
  }

  const normalizedEmail = email.toLowerCase();
  const entry = await OTP.findOne({ email: normalizedEmail, purpose: "forgot" });
  if (!entry || entry.expiresAt < new Date()) {
    res.status(400);
    throw new Error("Reset token expired");
  }

  const ok = await bcrypt.compare(String(resetToken), entry.otpHash);
  if (!ok) {
    res.status(400);
    throw new Error("Invalid reset token");
  }

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.password = newPassword;
  await user.save();
  await entry.deleteOne();

  res.json({ message: "Password reset success. Please login." });
});