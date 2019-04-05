const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

// MongoDB connection
const mongoDB = process.env.MONGO_URI || config.get('mongoURI');

module.exports = function () {
    // Connect to mongoDB
    mongoose.connect(
        mongoDB,
        { 
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    ).then(() => winston.info('Connected to MongoDB...'));
};