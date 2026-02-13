const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const visitorMiddleware = require("./middleware/visitorMiddleware");

dotenv.config();
connectDB();

const app = express();

/* ================= SECURITY MIDDLEWARE ================= */

app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(hpp());

/* ================= CORS CONFIG (PRODUCTION READY) ================= */

const allowedOrigins = [
  "https://divinechatter.com",
  "https://www.divinechatter.com",
  "https://divinechatter.netlify.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow non-browser tools like Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

/* ================= DEV LOGGING ================= */

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

/* ================= RATE LIMIT ================= */

app.set("trust proxy", 1);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false
  })
);

/* ================= VISITOR TRACKING ================= */

app.use(visitorMiddleware);

/* ================= ROUTES ================= */

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/content", require("./routes/contentRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

/* ================= HEALTH CHECK ================= */

app.get("/api/health", (req, res) => res.json({ ok: true }));

/* ================= ERROR HANDLING ================= */

app.use(notFound);
app.use(errorHandler);

/* ================= SERVER START ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
