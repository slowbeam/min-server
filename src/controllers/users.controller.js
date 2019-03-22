const User = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const validateLoginInput = require("../validations/login.validation");
const validateSignUpInput = require("../validations/signup.validation");

// Public Route: POST 'api/v1/users'
exports.createUser = (req, res) => {
    const { errors, isValid } = validateSignUpInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = "Email already exists";
            return res.status(400).json(errors);
        } else {
            let newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
};

// Public Route 'api/v1/users/login'
exports.logInUser = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = "User not found";
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, user.password).then(checkPassword => {
            if (checkPassword) {
                let payload = {
                    id: user.id,
                    name: user.name
                };

                jwt.sign(payload, keys.secretOrKey, (err, token) => {
                    res.json({
                        token: "Bearer " + token
                    });
                });
            } else {
                errors.password = "Password is incorrect";
                return res.status(400).json(errors);
            }
        });
    });
};

// Public Route: GET 'api/v1/users'
exports.getUsers = (req, res) => {
    let errors = {};
    User.find()
        .then(users => {
            if (!users) {
                errors.noUser = "There are no users";
                return res.status(404).json(errors);
            }
            res.json(users);
        })
        .catch(err => res.status(404).json({ user: "There are no users"}));
};

// Private Route: 'api/v1/users/current'
exports.getCurrentUser = (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
};