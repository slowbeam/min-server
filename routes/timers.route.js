const router = require('express').Router();
const timerController = require("../controllers/timers.controller");
const auth = require('../middleware/auth');


// Public Routes
router.get("/", timerController.getTimers);
router.get("/:id", timerController.getTimer);

// Private Routes
router.post("/", auth, timerController.createTimer);
router.put("/:id", auth, timerController.updateTimer);
router.delete("/:id", auth, timerController.deleteTimer);

module.exports = router;