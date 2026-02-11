const VisitorLog = require("../models/VisitorLog");

function getClientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  if (xf) return xf.split(",")[0].trim();
  return req.ip;
}

module.exports = async (req, res, next) => {
  try {
    if (req.method !== "GET") return next();
    if (req.path.startsWith("/api/health")) return next();

    const ip = getClientIp(req);
    const ua = req.headers["user-agent"] || "unknown";
    const day = new Date().toISOString().slice(0, 10);

    await VisitorLog.updateOne(
      { ip, ua, day },
      { $setOnInsert: { ip, ua, day, createdAt: new Date() } },
      { upsert: true }
    );

    next();
  } catch {
    next();
  }
};