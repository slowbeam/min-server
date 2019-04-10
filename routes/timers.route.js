const router = require('express').Router();
const timerController = require("../controllers/timers.controller");
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');

// Public Routes
router.get("/", timerController.getTimers);
router.get("/:id", validateObjectId, timerController.getTimer);

// Private Routes
router.post("/", auth, timerController.createTimer);
router.put("/:id", [auth, validateObjectId], timerController.updateTimer);
router.delete("/:id", auth, timerController.deleteTimer);

module.exports = router;