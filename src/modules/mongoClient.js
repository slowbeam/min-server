// Connects to the MongoDB Atlas database "timers" collection
const CONNECTION_URL = "mongodb+srv://slowbeam:C0d3lyf3@min-server-vvox5.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "test";
let database, collection;

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        throw error;
    }
    database = client.db(DATABASE_NAME);
    collection = database.collection("timers");
    console.log("Connected to timers!");
});