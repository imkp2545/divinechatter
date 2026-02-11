const router = require("express").Router();
const uc = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, uc.getMe);
router.put("/profile", protect, uc.updateProfile);

router.get("/notifications", protect, uc.getNotifications);
router.put("/notifications/:id/read", protect, uc.markNotificationRead);

module.exports = router;