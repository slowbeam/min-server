const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateTimerInput(input) {
    let errors = {};

    input.currentTime = !isEmpty(input.currentTime) ? input.currentTime : "";
    input.intervalNum = !isEmpty(input.intervalNum) ? input.intervalNum : "";
    input.timerHours = !isEmpty(input.timerHours) ? input.timerHours : "";
    input.timerMinutes = !isEmpty(input.timerMinutes) ? input.timerMinutes : "";
    input.timerSeconds = !isEmpty(input.timerSeconds) ? input.timerSeconds : "";

    if (validator.isEmpty(input.currentTime)) {
        errors.currentTime = "Current time field is required";
    }

    if (validator.isEmpty(input.intervalNum)) {
        errors.intervalNum = "Interval number field is required";
    }

    if (validator.isEmpty(input.timerHours)) {
        errors.timerHours = "Timer hours field is required";
    }

    if (validator.isEmpty(input.timerMinutes)) {
        errors.timerMinutes = "Timer minutes field is required";
    }

    if (validator.isEmpty(input.timerSeconds)) {
        errors.timerSeconds = "Timer seconds field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};