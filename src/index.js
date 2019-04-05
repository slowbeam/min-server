const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const winston = require('winston');
require('dotenv').config();
require('express-async-errors');
require('winston-mongodb');



// Load routes
require('./startup/routes')(app);

// MongoDB connection
const mongoDB = process.env.MONGO_URI || config.get('mongoURI');

// Handle uncaught exceptions
winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log' }))

// Handle uncaught promise rejections
process.on('unhandledRejection', (ex) => {
    throw ex;
});

// Log server errors to logfile.log
winston.add(winston.transports.File, { filename: 'logfile.log'});

// Handle missing jwtPrivateKey
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

// Connect to mongoDB
mongoose.connect(
    mongoDB,
    { 
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);

// CORS middleware (enable all CORS requests)
// app.use(cors());

// Logs a message to the console when a request is made
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
});

// Serves the API via the public folder's index.html
app.use(express.static('public'));

// Server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
        console.log('CORS-enabled server is running on port ' + PORT);   
});



