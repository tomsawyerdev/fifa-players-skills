
const config = require('../config');
const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var {Users} = require('../models');


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret;

passport.use(new JwtStrategy(opts, (payload, done)=> {
    
            //console.log("Passport payload:",payload) 
            var user = Users.findOne({ where:{username:payload.username}})
            // user es una promesa
            //console.log("Passport user:",user) 
            if (user) {
                return done(null, user);
            } else {
                //console.log("JwtStrategy: not user") ;
                return done(null, false);
                
            }}));

            

module.exports = passport.authenticate('jwt', { session:  false })