require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");

(async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL || "admin@yourdomain.com";

    const exists = await User.findOne({ email });
    if (exists) {
      console.log("Admin already exists:", email);
      process.exit(0);
    }

    const admin = await User.create({
      name: "Admin",
      email,
      password: "Admin@12345",
      role: "admin",
      isActive: true
    });

    console.log("Admin created:", admin.email, "password: Admin@12345");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();