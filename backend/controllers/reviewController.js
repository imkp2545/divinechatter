const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");

const Review = require("../models/Review");
const Product = require("../models/Product");
const Notification = require("../models/Notification");

// USER: create review (pending)
exports.createReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment } = req.body;

  if (!productId || !rating) {
    res.status(400);
    throw new Error("productId and rating required");
  }

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid productId");
  }

  const product = await Product.findById(productId);
  if (!product || !product.isLive) {
    res.status(404);
    throw new Error("Product not found");
  }

  const review = await Review.create({
    product: product._id,
    user: req.user._id,
    rating: Number(rating),
    comment: comment || "",
    status: "pending"
  });

  res.status(201).json({ message: "Review submitted for approval", review });
});

// PUBLIC: global reviews (approved only) - not product specific
// GET /api/reviews/public?page=1&limit=20
exports.getPublicApprovedReviews = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  const q = { status: "approved" };

  const [items, total] = await Promise.all([
    Review.find(q)
      .populate("product", "name slug images")
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Review.countDocuments(q)
  ]);

  res.json({
    items,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum)
    }
  });
});

// ADMIN: pending reviews list (existing)
exports.getPendingReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ status: "pending" })
    .populate("product", "name slug")
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(reviews);
});

// ADMIN: all reviews (approved + pending) with filters + pagination
// GET /api/reviews?status=pending|approved&productId=&page=&limit=
exports.getAllReviewsAdmin = asyncHandler(async (req, res) => {
  const { status, productId, page = 1, limit = 20 } = req.query;

  const q = {};

  if (status) {
    if (!["pending", "approved"].includes(status)) {
      res.status(400);
      throw new Error("Invalid status filter");
    }
    q.status = status;
  }

  if (productId) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400);
      throw new Error("Invalid productId");
    }
    q.product = productId;
  }

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(100, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  const [items, total] = await Promise.all([
    Review.find(q)
      .populate("product", "name slug")
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Review.countDocuments(q)
  ]);

  res.json({
    items,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum)
    }
  });
});

// ADMIN: approve review (existing)
exports.approveReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  review.status = "approved";
  await review.save();

  await Notification.create({
    user: review.user,
    title: "Review Approved",
    message: "Your review has been approved and is now visible."
  });

  res.json({ message: "Review approved" });
});

// ADMIN: delete review (works for pending + approved)
exports.deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  await review.deleteOne();
  res.json({ message: "Review deleted" });
});