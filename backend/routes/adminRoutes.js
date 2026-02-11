const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

router.use(protect, adminOnly);

router.get("/dashboard", adminController.getDashboardStats);

router.get("/users", adminController.getUsers);
router.get("/users/:id", adminController.getUserById);
router.put("/users/:id/role", adminController.updateUserRole);
router.put("/users/:id/status", adminController.updateUserStatus);

router.get("/contacts", adminController.getContacts);
router.get("/reviews/pending", adminController.getPendingReviews);
router.get("/products", adminController.getAllProductsAdmin);

router.get("/faqs", adminController.getFaqs);
router.get("/coming-soon", adminController.getComingSoon);

module.exports = router;