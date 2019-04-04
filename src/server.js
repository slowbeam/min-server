require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const users = require('./routes/users.route');
const timers = require('./routes/timers.route');
const auth = require('./routes/auth.route');
const config = require('config');



// MongoDB connection
const mongoDB = process.env.MONGO_URI || config.get('mongoURI');

mongoose.connect(
    mongoDB,
    { 
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS middleware (enable all CORS requests)
app.use(cors());

// Logs a message to the console when a request is made
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
});

// Routes
app.use('/api/v1/users', users);
app.use("/api/v1/timers", timers);
app.use("/api/v1/auth", auth);

// Serves the API via the public folder's index.html
app.use(express.static('public'));

// Server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
        console.log("CORS-enabled server is running on port " + PORT);   
});



