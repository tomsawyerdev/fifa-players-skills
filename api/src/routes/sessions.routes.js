const express = require('express');

var router = express.Router();

var {sessions:controller} = require('../controllers');

var {validator} = require('../middlewares');

//console.log("typeof:",typeof(validator),Object.keys(validator));

// Create Session

router.post('/', validator.sessionNew, controller.create);



module.exports = router;  