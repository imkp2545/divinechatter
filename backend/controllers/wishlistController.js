const asyncHandler = require("../utils/asyncHandler");
const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

exports.getWishlist = asyncHandler(async (req, res) => {
  const items = await Wishlist.find({ user: req.user._id })
    .populate("product")
    .sort({ createdAt: -1 });
  res.json(items);
});

exports.addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    res.status(400);
    throw new Error("productId required");
  }

  const product = await Product.findById(productId);
  if (!product || !product.isLive) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Wishlist.updateOne(
    { user: req.user._id, product: product._id },
    { $setOnInsert: { user: req.user._id, product: product._id } },
    { upsert: true }
  );

  res.json({ message: "Added to wishlist" });
});

exports.removeFromWishlist = asyncHandler(async (req, res) => {
  await Wishlist.deleteOne({ user: req.user._id, product: req.params.productId });
  res.json({ message: "Removed from wishlist" });
});