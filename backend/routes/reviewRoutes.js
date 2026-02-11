const router = require("express").Router();
const rc = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

// PUBLIC (global approved reviews)
router.get("/public", rc.getPublicApprovedReviews);

// USER
router.post("/", protect, rc.createReview);

// ADMIN
router.get("/", protect, adminOnly, rc.getAllReviewsAdmin);
router.get("/pending", protect, adminOnly, rc.getPendingReviews);
router.put("/:id/approve", protect, adminOnly, rc.approveReview);
router.delete("/:id", protect, adminOnly, rc.deleteReview);

module.exports = router;