const router = require("express").Router();
const cc = require("../controllers/contentController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

router.get("/faqs", cc.getFaqs);
router.get("/coming-soon", cc.getComingSoon);

router.post("/faqs", protect, adminOnly, cc.createFaq);
router.put("/faqs/:id", protect, adminOnly, cc.updateFaq);
router.delete("/faqs/:id", protect, adminOnly, cc.deleteFaq);

router.post("/coming-soon", protect, adminOnly, cc.createComingSoon);
router.put("/coming-soon/:id", protect, adminOnly, cc.updateComingSoon);
router.delete("/coming-soon/:id", protect, adminOnly, cc.deleteComingSoon);

module.exports = router;