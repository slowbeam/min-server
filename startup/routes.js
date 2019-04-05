const bodyParser = require('body-parser');
const error = require('../middleware/error');
const users = require('../routes/users.route');
const timers = require('../routes/timers.route');
const auth = require('../routes/auth.route');

module.exports = function (app) {
    // Body parser middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // Routes
    app.use('/api/v1/users', users);
    app.use('/api/v1/timers', timers);
    app.use('/api/v1/auth', auth);
    
    // Handle server-side errors
    app.use(error);
};