const mongoose = require('mongoose');
const Joi = require('joi');

function validateTimer(timer) {
    const schema = { 
        userId: Joi.objectId(),
        name: Joi.string().min(1).max(50).allow(''),
        isPomodoro: Joi.boolean().required(),
        currentTime: Joi.number().required(),
        intervalNumber: Joi.number().allow(null),
        hours: Joi.string().min(0).max(2).allow('').required(),
        minutes: Joi.string().min(0).max(2).allow('').required(),
        seconds: Joi.string().min(0).max(2).allow('').required(),
        shortBreakTime: Joi.number(),
        shortBreakLength: Joi.number(),
        shortBreakMinutes: Joi.string().min(0).max(2).allow(''),
        longBreakTime: Joi.number(),
        longBreakLength: Joi.number(),
        longBreakMinutes: Joi.string().min(0).max(2).allow(''),
        isShortBreak: Joi.boolean(),
        isLongBreak: Joi.boolean(),
        pomodoroCounter: Joi.number()
    };

    return Joi.validate(timer, schema);
}

const timerSchema = new mongoose.Schema ({
    user: {
        type: new mongoose.Schema ({
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            }
        }),
        required: true
    },
    name: {
        type: String,
        minlength: 0,
        maxlength: 50,
        default: ""
    },
    isPomodoro: {
        type: Boolean,
        required: true
    },
    currentTime: {
        type: Number,
        required: true
    },
    intervalNumber: {
        type: Number
    },
    hours: {
        type: String,
        minlength: 0,
        maxlength: 2
    },
    minutes: {
        type: String,
        minlength: 0,
        maxlength: 2
    },
    seconds: {
        type: String,
        minlength: 0,
        maxlength: 2
    },
    shortBreakTime: {
        type: Number,
        default: 0
    },
    shortBreakLength: {
        type: Number,
        default: 0
    },
    shortBreakMinutes: {
        type: String,
        minlength: 0,
        maxlength: 2,
        default: ""
    },
    longBreakTime: {
        type: Number,
        default: 0
    },
    longBreakLength: {
        type: Number,
        default: 0
    },
    longBreakMinutes: {
        type: String,
        minlength: 0,
        maxlength: 2,
        default: ""
    },
    isShortBreak: {
        type: Boolean,
        default: false
    },
    isLongBreak: {
        type: Boolean,
        default: false
    },
    pomodoroCounter: {
        type: Number,
        default: 0
    }
});

const Timer = mongoose.model("Timer", timerSchema);

exports.Timer = Timer;
exports.validate = validateTimer;

