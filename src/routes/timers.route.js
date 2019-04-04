const router = require('express').Router();
const timerController = require("../controllers/timers.controller");
const auth = require('../middleware/auth');


// Public Routes
router.get("/", timerController.getTimers);
router.get("/:timer_id", timerController.getTimer);

// Private Routes
router.post("/", auth, timerController.createTimer);
router.put("/:timer_id", auth, timerController.updateTimer);
router.delete("/:timer_id", auth, timerController.deleteTimer);

module.exports = router;