const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const Notification = require("../models/Notification");

exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (name) user.name = name;
  await user.save();

  res.json({ message: "Profile updated", user: { id: user._id, name: user.name, email: user.email } });
});

exports.getNotifications = asyncHandler(async (req, res) => {
  const items = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(items);
});

exports.markNotificationRead = asyncHandler(async (req, res) => {
  await Notification.updateOne({ _id: req.params.id, user: req.user._id }, { $set: { read: true } });
  res.json({ message: "Marked read" });
});