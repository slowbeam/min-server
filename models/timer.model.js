const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const timerSchema = new Schema ({
    user: {
        type: new Schema ({
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
    isPomodoro: {
        type: Boolean,
        required: true
    },
    currentTime: {
        type: Number,
        required: true
    },
    intervalNum: {
        type: Number,
        required: true
    },
    timerHours: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2
    },
    timerMinutes: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2
    },
    timerSeconds: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2
    },
    breakTime: {
        type: Number,
        default: 0
    },
    breakLength: {
        type: Number,
        default: 0
    },
    breakMinutes: {
        type: String,
        minlength: 1,
        maxlength: 2,
        default: "00"
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
        minlength: 1,
        maxlength: 2,
        default: "00"
    },
    isBreak: {
        type: Boolean,
        default: false
    },
    isLongBreak: {
        type: Boolean,
        default: false
    },
    pomCount: {
        type: Boolean,
        default: false
    }
});

const Timer = mongoose.model("Timer", timerSchema);

function validateTimer(timer) {
    const schema = {
        userId: Joi.objectId().required(),
        isPomodoro: Joi.boolean().required(),
        currentTime: Joi.number().required(),
        intervalNum: Joi.number().required(),
        timerHours: Joi.string().min(1).max(2).required(),
        timerMinutes: Joi.string().min(1).max(2).required(),
        timerSeconds: Joi.string().min(1).max(2).required(),
        breakTime: Joi.number(),
        breakLength: Joi.number(),
        breakMinutes: Joi.string().min(1).max(2),
        longBreakTime: Joi.number(),
        longBreakLength: Joi.number(),
        longBreakMinutes: Joi.string().min(1).max(2),
        isBreak: Joi.boolean(),
        isLongBreak: Joi.boolean(),
        pomCount: Joi.number()
    };

    return Joi.validate(timer, schema);
}

exports.Timer = Timer;
exports.validate = validateTimer;

