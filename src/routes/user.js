let UserModel = require('../models/user.model');
let express = require('express');
let router = express.Router();

// Create a new User
router.post('/user', (req, res) => {
    if (!req.body) {
        return res.status(500).send('Request body is missing.');
    }
    // let user = {
    //     name: 'firstname lastname',
    //     email: 'email@email.com'
    // }
    let model = new UserModel(req.body);
    model.save()
    .then(doc => {
        if (!doc || doc.length === 0) {
            return res.status(500).send(doc);
        }

        res.status(201).send(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;