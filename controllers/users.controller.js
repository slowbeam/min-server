const {User}= require("../models/user.model");
const _ = require('lodash');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

// Assign the x-auth-token to the headers of the response
const assignTokenToResponseHeaders = (req, res) => {
    let header = req.headers['x-auth-token'] || "";
    res.set('x-auth-token', header);
};

// Register a new user, Public Route: POST 'api/v1/users'
exports.createUser = async (req, res) => {  
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('A user with this email already exists.');

    user = new User(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));   
};

// Private Route: GET 'api/v1/users'
exports.getUsers = async (req, res) => {
    const users = await User.find().sort({ name: 1});

    assignTokenToResponseHeaders(req, res);

    res.send(users);
};

// Private Route: 'api/v1/users/me'
exports.getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    assignTokenToResponseHeaders(req, res);

    res.send(user);
};