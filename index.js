const express = require('express');
const app = express();
const cors = require('cors');
const winston = require('winston');
require('dotenv').config();

// Load startup modules
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

// CORS middleware (enable all CORS requests)
// app.use(cors());

// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => winston.info(`CORS-enabled server is running on port ${PORT}...`));



