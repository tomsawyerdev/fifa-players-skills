
const express = require('express');
var router = express.Router();

var {players:controller} = require('../controllers');

var {validator} = require('../middlewares');


// List
// http://localhost:3000/playes


//localhost:3000/players?format=csv

router.get('/', controller.list); 

router.post('/set', controller.getset); 

// Get one
router.get('/:id', controller.get);

// Create, 

router.post('/',  validator.playerNew, controller.create);

// Update 

// celebrate change string to number,
// sin el validator sequelize lo castea sin problema
router.post('/:id', validator.playerNew,controller.update);//



//Remove
router.delete('/:id', controller.remove);




module.exports = router;  