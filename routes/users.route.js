const router = require("express").Router();
const userController = require("../controllers/users.controller");
const auth = require('../middleware/auth');

// Public Routes
router.post("/", userController.createUser);

// Private Routes
router.get("/me", auth, userController.getCurrentUser);
router.get("/", auth, userController.getUsers);

module.exports = router;