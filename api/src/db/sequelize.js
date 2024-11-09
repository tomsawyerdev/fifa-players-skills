
const config = require('../config');
const Sequelize = require("sequelize");

/*
console.log("-----sequelize---------");
    console.log("user:",config.dbuser);
    console.log("host:",config.dbhost);
    console.log("database:",config.dbdatabase);
    console.log("password:",config.dbpassword);*/

const sequelize = new Sequelize(
                                config.dbdatabase,
                                config.dbuser,
                                config.dbpassword,
                                { host: config.dbhost,
                                  dialect: 'mysql',
                                  define: { timestamps: false},
                                  logging: false
                                }
                                );



module.exports = sequelize;