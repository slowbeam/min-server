let mongoose = require('mongoose');
// let mongodb = require('mongodb');

// const uri = "mongodb+srv://slowbeam:C0d3lyf3@min-server-vvox5.mongodb.net/test?retryWrites=true";

// mongoose.connect(uri);

let UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true,
        unique: true
    }
})

module.exports = mongoose.model('User', UserSchema);