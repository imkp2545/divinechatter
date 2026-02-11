const asyncHandler = require("../utils/asyncHandler");
const FAQ = require("../models/FAQ");
const ComingSoonProduct = require("../models/ComingSoonProduct");

exports.getFaqs = asyncHandler(async (req, res) => {
  const faqs = await FAQ.find().sort({ createdAt: -1 });
  res.json(faqs);
});

exports.createFaq = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    res.status(400);
    throw new Error("question and answer required");
  }
  const faq = await FAQ.create({ question, answer });
  res.status(201).json(faq);
});

exports.updateFaq = asyncHandler(async (req, res) => {
  const faq = await FAQ.findById(req.params.id);
  if (!faq) {
    res.status(404);
    throw new Error("FAQ not found");
  }
  faq.question = req.body.question ?? faq.question;
  faq.answer = req.body.answer ?? faq.answer;
  await faq.save();
  res.json(faq);
});

exports.deleteFaq = asyncHandler(async (req, res) => {
  const faq = await FAQ.findById(req.params.id);
  if (!faq) {
    res.status(404);
    throw new Error("FAQ not found");
  }
  await faq.deleteOne();
  res.json({ message: "FAQ deleted" });
});

exports.getComingSoon = asyncHandler(async (req, res) => {
  const items = await ComingSoonProduct.find().sort({ createdAt: -1 });
  res.json(items);
});

exports.createComingSoon = asyncHandler(async (req, res) => {
  const { name, launchInfo, expectedDate } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("name required");
  }
  const item = await ComingSoonProduct.create({
    name,
    launchInfo: launchInfo || "",
    expectedDate: expectedDate ? new Date(expectedDate) : undefined
  });
  res.status(201).json(item);
});

exports.updateComingSoon = asyncHandler(async (req, res) => {
  const item = await ComingSoonProduct.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }
  item.name = req.body.name ?? item.name;
  item.launchInfo = req.body.launchInfo ?? item.launchInfo;
  if (req.body.expectedDate !== undefined) item.expectedDate = req.body.expectedDate ? new Date(req.body.expectedDate) : undefined;
  await item.save();
  res.json(item);
});

exports.deleteComingSoon = asyncHandler(async (req, res) => {
  const item = await ComingSoonProduct.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }
  await item.deleteOne();
  res.json({ message: "Deleted" });
});