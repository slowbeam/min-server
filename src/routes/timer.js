let express = require('express');
let router = express.Router();

router.get('/timer', (req, res) => {
    res.send('You have requested a timer');
})

router.get('/timer/:name', (req, res) => {
    res.send(`You have requested a timer ${req.params.name}`);
})



module.exports = router;