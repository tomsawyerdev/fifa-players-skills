const {  DataTypes } = require("sequelize");

const db = require('../db/sequelize');

const Team = db.define("teams", {
    country: { type: DataTypes.STRING},
    name: { type: DataTypes.STRING}
 });


module.exports= Team