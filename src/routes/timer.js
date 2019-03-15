let express = require('express');
let router = express.Router();

// QueryString => query property on the request object
// localhost:3000/timer?name=sandy&age=30
router.get('/timer', (req, res) => {
    if (req.query.name) {
        res.send(`You have requested a timer ${req.query.name}`);
    } else {
        res.send('You have requested a timer');
    }
});
// Params property on the request object
// localhost:3000/timer/sandy
router.get('/timer/:name', (req, res) => {
    res.send(`You have requested a timer ${req.params.name}`);
});



module.exports = router;