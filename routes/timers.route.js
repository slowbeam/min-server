const router = require('express').Router();
const timerController = require("../controllers/timers.controller");
const auth = require('../middleware/auth');
const validator = require('../middleware/validate');
const {validate} = require("../models/timer.model.js");
const validateObjectId = require('../middleware/validateObjectId');

// Public Routes
router.get("/", timerController.getTimers);
router.get("/:id", validateObjectId, timerController.getTimer);

// Private Routes
router.post("/", [auth, validator(validate)], timerController.createTimer);
router.put("/:id", [auth, validateObjectId, validator(validate)], timerController.updateTimer);
router.delete("/:id", [auth, validateObjectId], timerController.deleteTimer);

module.exports = router;