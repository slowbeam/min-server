const router = require("express").Router();
const userController = require("../controllers/users.controller");

// Public Routes
router.post("/", userController.createUser);
router.post("/login", userController.logInUser);
router.get("/", userController.getUsers);

// Private Routes
router.get(
    "/current",
    userController.getCurrentUser
);

module.exports = router;