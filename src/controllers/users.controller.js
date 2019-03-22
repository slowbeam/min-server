const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const validateLoginInput = require("../validations/login.validation");
const validateSignUpInput = require("../validations/signup.validation");


