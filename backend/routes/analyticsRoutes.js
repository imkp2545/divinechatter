const router = require("express").Router();
const ac = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

router.get("/admin-dashboard", protect, adminOnly, ac.adminDashboardStats);

module.exports = router;