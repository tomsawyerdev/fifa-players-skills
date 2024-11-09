const {  DataTypes } = require("sequelize");

const db = require('../db/sequelize');

const User = db.define("users", {
    username: { type: DataTypes.STRING,   allowNull: false    },
    hash: { type: DataTypes.STRING,   allowNull: false    }
 });


module.exports= User