const router = require("express").Router();
const userController = require("../controllers/users.controller");
const auth = require('../middleware/auth');
const validator = require('../middleware/validate');
const {validate} = require("../models/user.model.js");

// Public Routes
router.post("/", validator(validate), userController.createUser);

// Private Routes
router.get("/me", auth, userController.getCurrentUser);
router.get("/", auth, userController.getUsers);

module.exports = router;