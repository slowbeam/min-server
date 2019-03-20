const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimerSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
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
    }
});

module.exports = mongoose.model("Timer", TimerSchema);