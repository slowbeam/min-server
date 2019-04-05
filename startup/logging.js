const winston = require('winston');
require('express-async-errors');

module.exports = function() {
    // Handle uncaught exceptions
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }))

    // Handle uncaught promise rejections
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    // Log server errors to logfile.log
    winston.add(winston.transports.File, { filename: 'logfile.log'});
}