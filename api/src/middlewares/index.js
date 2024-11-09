const isAuthenticated = require('./passport.js');
const {sessionNew} = require('./validators/session.schema.js')
const {playerNew} = require('./validators/player.schema.js')

//console.log("typeof:",typeof(validator),Object.keys(validator));
module.exports= {isAuthenticated, validator:{sessionNew,playerNew}};