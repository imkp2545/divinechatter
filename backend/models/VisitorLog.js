const mongoose = require("mongoose");

const visitorLogSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
    ua: { type: String, required: true },
    day: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

visitorLogSchema.index({ ip: 1, ua: 1, day: 1 }, { unique: true });

module.exports = mongoose.model("VisitorLog", visitorLogSchema);