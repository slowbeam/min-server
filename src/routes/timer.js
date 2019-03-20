const router = require('express').Router();
const timerController = require("../controllers/timers.controller");

// const MongoClient = require('mongodb').MongoClient;

// // Connects to the MongoDB Atlas database "timers" collection
// const CONNECTION_URL = "mongodb+srv://slowbeam:C0d3lyf3@min-server-vvox5.mongodb.net/test?retryWrites=true";
// const DATABASE_NAME = "test";
// let database, collection;
// MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
//     if(error) {
//         throw error;
//     }
//     database = client.db(DATABASE_NAME);
//     collection = database.collection("timers");
//     console.log("Connected to timers!");
// });

// Post route for adding a new timer obj to the db
router.post("/timers", (req, res) => {
    collection.insertOne(req.body, (error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result.result);
    });
});

// Get route for retrieving all timer objs
router.get("/timers", (req, res) => {
    collection.find({}).toArray((error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});

// QueryString => query property on the request object
// localhost:3000/timer?name=sandy&age=30
router.get('/timer', (req, res) => {
    if (req.query.name) {
        res.send(`You have requested a timer ${req.query.name}`);
    } else {
        res.send('You have requested a timer');
    }
});

// Params property on the request object
// localhost:3000/timer/sandy
router.get('/timer/:name', (req, res) => {
    res.send(`You have requested a timer ${req.params.name}`);
});

router.get('/error', (req, res) => {
    throw new Error('This is a forced error.');
})



module.exports = router;