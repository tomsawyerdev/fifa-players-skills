const express = require('express');

var router = express.Router();

var {utils} = require('../controllers');



//console.log("typeof:",typeof(utils),Object.keys(utils));


router.get('/countries', utils.getCountries);
router.get('/teams', utils.getTeams);



module.exports = router;  