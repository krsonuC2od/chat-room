const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Route
router.post("/register", authController.registerController);
router.post("/login", authController.loginController);
router.post("/logout", authController.logoutController);

module.exports = router;
