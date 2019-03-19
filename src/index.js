let express = require('express');

let app = express();

let timerRoute = require('./routes/timer');

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`);
    next();
});

app.use(timerRoute);
app.use(express.static('public'));

// Handler for 404 - Resource Not Found
app.use((req,res,next) => {
    res.status(404).send('We think you are lost!');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));