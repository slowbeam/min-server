const mongoose = require('mongoose');
const {Timer} = require("../models/timer.model.js");
const { User } = require("../models/user.model.js");
const assignTokenToResponseHeaders = require('../middleware/assignTokenToResponseHeaders');

// Public Route: GET 'api/v1/timers'
exports.getTimers = async (req, res) => {
    const timers = await Timer.find();
    res.send(timers);
};

// Public Route: GET 'api/v1/timers/:id'
exports.getTimer = async (req, res) => {
    const timer = await Timer.findById(req.params.id);

    if (!timer) res.status(404).send("The timer with the provided ID was not found.");
    res.send(timer);  
};

// Private Route: POST 'api/v1/timers'
exports.createTimer = async (req, res) => {
    let user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid user');

    let timer = new Timer ({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        name: req.body.name,
        currentTime: req.body.currentTime,
        intervalNum: req.body.intervalNum,
        timerHours: req.body.timerHours,
        timerMinutes: req.body.timerMinutes,
        timerSeconds: req.body.timerSeconds,
        isPomodoro: req.body.isPomodoro,
        breakTime: req.body.breakTime,
        breakLength: req.body.breakLength,
        breakMinutes: req.body.breakMinutes,
        longBreakTime: req.body.longBreakTime,
        longBreakLength: req.body.longBreakLength,
        longBreakMinutes: req.body.longBreakMinutes,
        isBreak: req.body.isBreak,
        isLongBreak: req.body.isLongBreak,
        pomCount: req.body.pomCount
    });
    
    timer = await timer.save();

    res.set('Access-Control-Expose-Headers', 'x-auth-token');
    assignTokenToResponseHeaders(req, res);

    res.send(timer);
};

// Private Route: PUT 'api/v1/timers/:id'
exports.updateTimer = async (req, res) => {
    let timer = await Timer.findById(req.params.id);
    if (!timer) return res.status(404).send('The timer with the provided ID was not found.');

    const timerFields = {};

    timerFields.name = req.body.name;
    timerFields.isPomodoro = req.body.isPomodoro;
    timerFields.pomLength = req.body.pomLength;
    timerFields.currentTime = req.body.currentTime;
    timerFields.intervalNum = req.body.intervalNum;
    timerFields.timerHours = req.body.timerHours;
    timerFields.timerMinutes = req.body.timerMinutes;
    timerFields.timerSeconds = req.body.timerSeconds;
    timerFields.breakTime = req.body.breakTime;
    timerFields.breakMinutes = req.body.breakMinutes;
    timerFields.breakTime = req.body.breakTime;
    timerFields.breakLength = req.body.breakLength;
    timerFields.longBreakMinutes = req.body.longBreakMinutes;
    timerFields.longBreakTime = req.body.longBreakTime;
    timerFields.longBreakLength = req.body.longBreakLength;
    timerFields.isBreak = req.body.isBreak;
    timerFields.isLongBreak = req.body.isLongBreak;
    timerFields.pomCount = req.body.pomCount;

    timer = await Timer.findByIdAndUpdate( req.params.id,
        { $set: timerFields },
        { new: true }
    );

    res.set('Access-Control-Expose-Headers', 'x-auth-token');
    assignTokenToResponseHeaders(req, res);

    res.send(timer); 
};

// Private Route: DELETE 'api/v1/timers/:id'
exports.deleteTimer = async (req, res) => {
    const timer = await Timer.findOneAndDelete({ _id: req.params.id });
    if (!timer) return res.status(404).send('The timer with the provided ID was not found.');

    res.set('Access-Control-Expose-Headers', 'x-auth-token');
    assignTokenToResponseHeaders(req, res);

    res.send(timer);
};
