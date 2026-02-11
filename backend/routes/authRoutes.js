const router = require("express").Router();
const auth = require("../controllers/authController");

router.post("/signup", auth.signup);
router.post("/verify-signup-otp", auth.verifySignupOtp);
router.post("/login", auth.login);

router.post("/forgot-password", auth.forgotPassword);
router.post("/verify-forgot-otp", auth.verifyForgotOtp);
router.post("/reset-password", auth.resetPassword);

module.exports = router;