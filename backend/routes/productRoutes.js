const router = require("express").Router();
const pc = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

// PUBLIC
router.get("/", pc.getProducts);
router.get("/:slug", pc.getProductBySlug);

// ADMIN
router.post("/", protect, adminOnly, pc.upload.array("images", 10), pc.createProduct);
router.put("/:id", protect, adminOnly, pc.upload.array("images", 10), pc.updateProduct);
router.delete("/:id", protect, adminOnly, pc.deleteProduct);
router.delete("/:id/images", protect, adminOnly, pc.deleteProductImage);

module.exports = router;