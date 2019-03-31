const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//     pomLength: 0,
//     currentTime: 0,
//     breakLength: 0,
//     breakTime: 0,
//     longBreakLength: 0,
//     longBreakTime: 0,
//     longBreakMinutes: "00",
//     intervalNum: null,
//     timerRunning: false,
//     timerHours: "00",
//     timerMinutes: "00",
//     timerSeconds: "00",
//     isPomodoro: false,
//     breakMinutes: "00",
//     isBreak: false,
//     isLongBreak: false,
//     pomCount: 0

const TimerSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
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
        required: true
    },
    timerMinutes: {
        type: String,
        required: true
    },
    timerSeconds: {
        type: String,
        required: true
    },
    breakTime: Number,
    breakLength: Number,
    breakMinutes: String,
    longBreakTime: Number,
    longBreakLength: Number,
    longBreakMinutes: String,
    isBreak: Boolean,
    isLongBreak: Boolean,
    pomCount: Number

});

module.exports = mongoose.model("Timer", TimerSchema);