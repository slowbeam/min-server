const mongoose = require("mongoose");
const Timer = require("../models/timer.model.js");

// Public Route: GET 'api/v1/timers'
exports.getTimers = (req, res) => {
    Timer.find()
    .then(timers => res.json(timers))
    .catch(err => 
        res.status(404).json( { notFound: "Did not find any timers"})
    );
};

// Public Route: GET 'api/v1/timers/:timer_id'
exports.getTimer = (req, res) => {
    Timer.findById(req.params.timer_id)
    .then(timer => res.json(timer))
    .catch(err => 
        res.status(404).send({ notFound: "Did not find timer for this ID"})
    );
};

// Private Route: POST 'api/v1/timers'
exports.createTimer = (req, res) => {
    const {errors, isValid} = validateTimerInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    let timerFields = {};

    timerFields.user = req.user.id;
    timerFields.content = req.body.content;

    new Timer(timerFields).save().then(timer => res.json(timer));
};

// Private Route: PUT 'api/v1/timers/:timer_id'
exports.updateTimer = (req, res) => {
    Timer.findById(req.params.timer_id).then(timer => {
        let timerFields = {};

        timerFields.content = req.body.content;

        Timer.findOneAndUpdate(
            { user: req.user.id},
            { $set: timerFields },
            { new: true }
        ).then(timer => res.json(timer));
    });
};

// Private Route: DELETE 'api/v1/timers/:timer_id'
exports.deleteTimer = (req, res) => {
    Timer.findOneAndDelete({ _id: req.params.post_id})
    .then(timer => res.json(timer))
    .catch(err => res.status(404).json({ notFound: "Did not find timer for this ID"}));
};
