const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User}= require('../models/user.model');

// Login a user, Public Route 'api/v1/auth'
exports.logIn = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();

    res.set({
        'Access-Control-Expose-Headers': 'x-auth-token',
        'x-auth-token': token
    })

    res.send(_.pick(user, ['_id', 'name', 'email']));
};

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(req, schema);
};