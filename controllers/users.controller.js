const {User}= require("../models/user.model");
const {Timer} = require("../models/timer.model.js");
const _ = require('lodash');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const assignTokenToResponseHeaders = require('../middleware/assignTokenToResponseHeaders');

// Register a new user, Public Route: POST 'api/v1/users'
exports.createUser = async (req, res) => {  
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('A user with this email already exists.');

    user = new User(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const emptyTimerObj = {
        user: user,
        name: "",
        isPomodoro: false,
        currentTime: 0, 
        intervalNumber: null,
        timerRunning: false,
        hours: "",
        minutes: "",
        seconds: ""
    };

    const emptyPomObject = Object.assign({}, emptyTimerObj);
    emptyPomObject.isPomodoro = true;

    const pomodoro = new Timer(emptyPomObject);
    await pomodoro.save();

    timer1 = new Timer(emptyTimerObj);
    timer2 = new Timer(emptyTimerObj);
    await timer1.save();
    await timer2.save();

    const token = user.generateAuthToken();

    res.set({
        'Access-Control-Expose-Headers': 'x-auth-token',
        'x-auth-token': token
    });
    
    res.send(_.pick(user, ['_id', 'name', 'email', 'new']));   
};

// Private Route: GET 'api/v1/users/:id/multitimers'
exports.getUserMultiTimers = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) res.status(404).send("The user with the provided ID was not found.");

    const timers = await Timer.find({user: user, isPomodoro: false});

    res.set('Access-Control-Expose-Headers', 'x-auth-token');
    assignTokenToResponseHeaders(req, res);

    res.send(timers);
};

// Private Route: GET 'api/v1/users/:id/pomodoro'
exports.getUserPomodoro = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) res.status(404).send("The user with the provided ID was not found.");

    const timer = await Timer.findOne({user: user, isPomodoro: true});

    res.set('Access-Control-Expose-Headers', 'x-auth-token');
    assignTokenToResponseHeaders(req, res);

    res.send(timer);
};

// Private Route: GET 'api/v1/users'
exports.getUsers = async (req, res) => {
    const users = await User.find().sort({ name: 1});

    res.set('Access-Control-Expose-Headers', 'x-auth-token');
    assignTokenToResponseHeaders(req, res);

    res.send(users);
};

// Private Route: 'api/v1/users/me'
exports.getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    res.set('Access-Control-Expose-Headers', 'x-auth-token');
    assignTokenToResponseHeaders(req, res);

    res.send(user);
};