const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const CONNECTION_URL = "mongodb+srv://slowbeam:C0d3lyf3@min-server-vvox5.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "test";

let app = express();

const timerRoute = require('./routes/timer');
const userRoute = require('./routes/user');
const path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



// Logs a message to the console when a request is made
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
});

// Activates the routes created in the routes folder
app.use(timerRoute);
app.use(userRoute);


// Serves the API via the public folder's index.html
app.use(express.static('public'));

// Handler for 404 - Resource Not Found
app.use((req,res,next) => {
    res.status(404).send('We think you are lost!');
})

// Handler for 500 Error
app.use((err, req,res,next) => {
    console.error(err.stack);

    res.sendFile(path.join(__dirname, '../public/500.html'))
})

let database, collection;

// Begins local server on specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("users");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    })
});