const router = require("express").Router();
const authController = require("../controllers/auth.controller");

// Public Routes
router.post("/", authController.logIn);

module.exports = router;