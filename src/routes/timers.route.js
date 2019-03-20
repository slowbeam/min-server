const router = require('express').Router();
const timerController = require("../controllers/timers.controller");

// Public Routes
router.get("/", timerController.getTimers);
router.get("/:timer_id", timerController.getTimer);

// Private Routes
router.post(
    "/",
    timerController.createTimer
);
router.put(
    "/:timer_id",
    timerController.updateTimer
);
router.delete(
    "/:timer_id",
    timerController.deleteTimer
);

module.exports = router;