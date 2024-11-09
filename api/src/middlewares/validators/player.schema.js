
const { celebrate, Joi, Segments } = require('celebrate');


//------------------------------------
const long_name =Joi.string().max(250).required();
const player_face_url =Joi.string().max(250).required();
const value_eur = Joi.number().min(0).required();
const dob =Joi.string().max(10).required()
const height_cm  = Joi.number().min(0).max(300).required();
const weight_kg  = Joi.number().min(0).max(100).required();
const club_name =Joi.string().max(250).required()
const club_jersey_number  = Joi.number().min(0).max(100).required();
const nationality_name =Joi.string().max(250).required()
const attacking_crossing  = Joi.number().min(0).max(100).required();
const attacking_finishing  = Joi.number().min(0).max(100).required();
const attacking_heading_accuracy  = Joi.number().min(0).max(100).required();
const attacking_short_passing  = Joi.number().min(0).max(100).required();
const attacking_volleys  = Joi.number().min(0).max(100).required();
const skill_dribbling  = Joi.number().min(0).max(100).required();
const skill_curve  = Joi.number().min(0).max(100).required();
const skill_fk_accuracy  = Joi.number().min(0).max(100).required();
const skill_long_passing  = Joi.number().min(0).max(100).required();
const skill_ball_control  = Joi.number().min(0).max(100).required();
const movement_acceleration  = Joi.number().min(0).max(100).required();
const movement_sprint_speed  = Joi.number().min(0).max(100).required();
const movement_agility  = Joi.number().min(0).max(100).required();
const movement_reactions  = Joi.number().min(0).max(100).required();
const movement_balance  = Joi.number().min(0).max(100).required();
const power_shot_power  = Joi.number().min(0).max(100).required();
const power_jumping  = Joi.number().min(0).max(100).required();
const power_stamina  = Joi.number().min(0).max(100).required();
const power_strength  = Joi.number().min(0).max(100).required();
const power_long_shots  = Joi.number().min(0).max(100).required();
const gender =Joi.string().max(1).required();

//------------------------------------

  // email never change only the name
 const playerNew = celebrate({
  [Segments.BODY]: Joi.object().keys({
    long_name,
    player_face_url,
    value_eur,
    dob,
    height_cm,
    weight_kg,
    club_name,
    club_jersey_number,
    nationality_name,  
    attacking_crossing,
    attacking_finishing,
    attacking_heading_accuracy,
    attacking_short_passing,
    attacking_volleys,
    skill_dribbling,
    skill_curve,
    skill_fk_accuracy,
    skill_long_passing,
    skill_ball_control,
    movement_acceleration,
    movement_sprint_speed,
    movement_agility,
    movement_reactions,
    movement_balance,
    power_shot_power,
    power_jumping,
    power_stamina,
    power_strength,
    power_long_shots,
    gender
  }),
 });


  module.exports = {  playerNew  };