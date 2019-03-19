let UserModel = require('../models/user.model');
let express = require('express');
let router = express.Router();

// Create a new User
router.post('/user', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing.');
    }
    // let user = {
    //     name: 'firstname lastname',
    //     email: 'email@email.com'
    // }
    let model = new UserModel(req.body);
    model.save();
})