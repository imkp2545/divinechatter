const asyncHandler = require("../utils/asyncHandler");
const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");
const { isValidEmail } = require("../utils/validators");

exports.submitContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    res.status(400);
    throw new Error("name, email, message required");
  }
  if (!isValidEmail(email)) {
    res.status(400);
    throw new Error("Invalid email");
  }

  const doc = await Contact.create({ name, email: email.toLowerCase(), message });

  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: "New Contact Form Submission",
    html: `<div>
      <h3>New Contact</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b><br/>${String(message).replace(/\n/g, "<br/>")}</p>
    </div>`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
  });

  res.status(201).json({ message: "Submitted", contactId: doc._id });
});

exports.getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});