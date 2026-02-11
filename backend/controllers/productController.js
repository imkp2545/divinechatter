const Product = require("../models/Product");
const Review = require("../models/Review");
const cloudinary = require("../config/cloudinary");
const asyncHandler = require("../utils/asyncHandler");
const multer = require("multer");

const storage = multer.memoryStorage();
exports.upload = multer({ storage });

const uploadBufferToCloudinary = (buffer, folder = "products") =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(buffer);
  });

exports.getProducts = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const q = { isLive: true };
  if (search) q.name = { $regex: String(search), $options: "i" };
  const products = await Product.find(q).sort({ createdAt: -1 });
  res.json(products);
});

exports.getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isLive: true });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const reviews = await Review.find({ product: product._id, status: "approved" })
    .populate("user", "name")
    .sort({ createdAt: -1 });

  res.json({ product, reviews });
});

exports.createProduct = asyncHandler(async (req, res) => {
  const { name, description, features, isLive } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Name required");
  }

  let featureArr = [];
  if (typeof features === "string") {
    try {
      featureArr = JSON.parse(features);
      if (!Array.isArray(featureArr)) featureArr = [String(features)];
    } catch {
      featureArr = String(features).split(",").map((s) => s.trim()).filter(Boolean);
    }
  } else if (Array.isArray(features)) {
    featureArr = features;
  }

  const files = req.files || [];
  const images = [];
  for (const f of files) {
    const result = await uploadBufferToCloudinary(f.buffer, "products");
    images.push({ url: result.secure_url, publicId: result.public_id });
  }

  const product = await Product.create({
    name,
    description: description || "",
    features: featureArr,
    images,
    isLive: isLive === undefined ? true : String(isLive) === "true"
  });

  res.status(201).json(product);
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const { name, description, features, isLive } = req.body;
  if (name) product.name = name;
  if (description !== undefined) product.description = description;

  if (features !== undefined) {
    let featureArr = [];
    if (typeof features === "string") {
      try {
        featureArr = JSON.parse(features);
        if (!Array.isArray(featureArr)) featureArr = [String(features)];
      } catch {
        featureArr = String(features).split(",").map((s) => s.trim()).filter(Boolean);
      }
    } else if (Array.isArray(features)) {
      featureArr = features;
    }
    product.features = featureArr;
  }

  if (isLive !== undefined) product.isLive = String(isLive) === "true";

  const files = req.files || [];
  for (const f of files) {
    const result = await uploadBufferToCloudinary(f.buffer, "products");
    product.images.push({ url: result.secure_url, publicId: result.public_id });
  }

  await product.save();
  res.json(product);
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  for (const img of product.images) {
    try { await cloudinary.uploader.destroy(img.publicId); } catch {}
  }

  await Review.deleteMany({ product: product._id });
  await product.deleteOne();

  res.json({ message: "Product deleted" });
});

exports.deleteProductImage = asyncHandler(async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) {
    res.status(400);
    throw new Error("publicId required");
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.images = product.images.filter((i) => i.publicId !== publicId);
  await product.save();

  try { await cloudinary.uploader.destroy(publicId); } catch {}

  res.json(product);
});