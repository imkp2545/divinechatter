const mongoose = require("mongoose");

module.exports = mongoose.model(
  "FAQ",
  new mongoose.Schema(
    {
      question: { type: String, required: true, trim: true },
      answer: { type: String, required: true, trim: true }
    },
    { timestamps: true }
  )
);