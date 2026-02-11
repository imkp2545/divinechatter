const router = require("express").Router();
const cc = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

router.post("/", cc.submitContact);
router.get("/", protect, adminOnly, cc.getContacts);

module.exports = router;