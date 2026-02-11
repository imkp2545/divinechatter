const asyncHandler = require("../utils/asyncHandler");
const VisitorLog = require("../models/VisitorLog");
const Review = require("../models/Review");

exports.adminDashboardStats = asyncHandler(async (req, res) => {
  const totalVisitors = await VisitorLog.countDocuments();
  const pendingReviews = await Review.countDocuments({ status: "pending" });
  res.json({ totalVisitors, pendingReviews });
});