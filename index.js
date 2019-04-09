const express = require('express');
const app = express();
const cors = require('cors');
const winston = require('winston');
require('dotenv').config();

// CORS middleware (enable all CORS requests)
app.use(cors());
app.options('*', cors());

// Load startup modules
// require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

// Server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => winston.info(`CORS-enabled server is running on port ${PORT}...`));

module.exports = server;
