const mongoose = require("mongoose");

module.exports = mongoose.model(
  "ComingSoonProduct",
  new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      launchInfo: { type: String, default: "" },
      expectedDate: { type: Date }
    },
    { timestamps: true }
  )
);