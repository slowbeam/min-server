let express = require('express');

let app = express();

let timerRoute = require('./routes/timer');

app.use(timerRoute);
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));