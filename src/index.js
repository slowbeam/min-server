let express = require('express');

let app = express();

let timerRoute = require('./routes/timer');

let path = require('path');

// Logs a message to the console when a request is made
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`);
    next();
});

// Activates the /timer route created in the routes folder
app.use(timerRoute);

// Serves the API via the public folder's index.html
app.use(express.static('public'));

// Handler for 404 - Resource Not Found
app.use((req,res,next) => {
    res.status(404).send('We think you are lost!');
})

// Handler for 500 Error
app.use((err, req,res,next) => {
    console.error(err.stack);

    res.sendFile(path.join(__dirname, '../public/500.html'))
})

// Begins local server on specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));