const {  DataTypes } = require("sequelize");

const db = require('../db/sequelize');

const Countries = db.define("countries", {    
    name: { type: DataTypes.STRING}
 });


module.exports= Countries