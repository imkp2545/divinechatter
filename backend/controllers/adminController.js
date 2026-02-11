const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const Product = require("../models/Product");
const Review = require("../models/Review");
const Contact = require("../models/Contact");
const VisitorLog = require("../models/VisitorLog");
const FAQ = require("../models/FAQ");
const ComingSoonProduct = require("../models/ComingSoonProduct");

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const [totalVisitors, pendingReviews, totalUsers, totalProducts] = await Promise.all([
    VisitorLog.countDocuments(),
    Review.countDocuments({ status: "pending" }),
    User.countDocuments(),
    Product.countDocuments()
  ]);

  res.json({ totalVisitors, pendingReviews, totalUsers, totalProducts });
});

exports.getUsers = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const q = {};
  if (search) {
    q.$or = [
      { name: { $regex: String(search), $options: "i" } },
      { email: { $regex: String(search), $options: "i" } }
    ];
  }
  const users = await User.find(q).select("-password").sort({ createdAt: -1 });
  res.json(users);
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

exports.updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!["admin", "user"].includes(role)) {
    res.status(400);
    throw new Error("Invalid role");
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (String(user._id) === String(req.user._id) && role !== "admin") {
    res.status(400);
    throw new Error("You cannot remove your own admin role");
  }

  user.role = role;
  await user.save();

  res.json({ message: "Role updated", user: { id: user._id, role: user.role } });
});

exports.updateUserStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body;
  if (typeof isActive !== "boolean") {
    res.status(400);
    throw new Error("isActive must be boolean");
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (String(user._id) === String(req.user._id) && isActive === false) {
    res.status(400);
    throw new Error("You cannot deactivate your own account");
  }

  user.isActive = isActive;
  await user.save();

  res.json({ message: "Status updated", user: { id: user._id, isActive: user.isActive } });
});

exports.getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

exports.getPendingReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ status: "pending" })
    .populate("product", "name slug")
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(reviews);
});

exports.getAllProductsAdmin = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const q = {};
  if (search) q.name = { $regex: String(search), $options: "i" };
  const products = await Product.find(q).sort({ createdAt: -1 });
  res.json(products);
});

exports.getFaqs = asyncHandler(async (req, res) => {
  const faqs = await FAQ.find().sort({ createdAt: -1 });
  res.json(faqs);
});

exports.getComingSoon = asyncHandler(async (req, res) => {
  const items = await ComingSoonProduct.find().sort({ createdAt: -1 });
  res.json(items);
});