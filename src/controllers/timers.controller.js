const mongoose = require("mongoose");
const Timer = require("../models/timer.model.js");

// Public Route: 'api/v1/timers'
exports.getTimers = (req, res) => {
    Timer.find()
    .then(timers => res.json(timers))
    .catch(err => 
        res.status(404).json( { notFound: "Did not find any timers"})
    );
};

// Public Route: 'api/v1/timers/:timer_id'
exports.getTimer = (req, res) => {
    Timer.findById(req.params.timer_id)
    .then(timer => res.json(timer))
    .catch(err => 
        res.status(404).send({ notFound: "Did not find timer for this ID"})
    );
};