const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, token missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("Not authorized");
    }
    if (!user.isActive) {
      res.status(403);
      throw new Error("Account not active. Please verify OTP.");
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(401);
    next(e);
  }
};

module.exports = { protect };