const config = require('config');

module.exports = function() {
    // Handle missing jwtPrivateKey
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
    }
}