const { celebrate, Joi, Segments } = require('celebrate');



const sessionNew =  celebrate({
   [Segments.BODY]: Joi.object().keys({
    username: Joi.string().min(4).max(30).required(),
    password: Joi.string().min(4).max(30).required(),    
   }),
  });
 

  module.exports = {sessionNew};