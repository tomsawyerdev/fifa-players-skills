
var config = {};


    /**
     * Your favorite port parseInt(process.env.PORT, 10),
     */
     config.port= 3000,
  
    /**
     * Database
     */
    
    //console.log("config env:",process.env);

    //console.log("WARNING: config env: TODO BORRAR");
     
    config.dbuser= process.env.MYSQL_USER || 'apiuser';// TODO borrar
    config.dbhost= process.env.MYSQL_HOST || '127.0.0.1';
    config.dbdatabase= process.env.MYSQL_DATABASE || 'fifa';
    config.dbpassword= process.env.MYSQL_PASS || 'supersecret'; //NO PASSWORD, para seguir la misma definicion que MYSQL
    config.dbport= 3306;

    //console.log("config:",config);
    /*console.log("-----config---------");
    console.log(config.dbuser);
    console.log(config.dbhost);
    console.log(config.dbdatabase);
    console.log(config.dbpassword);*/

    
    /**
     * JWT
     */
     config.jwtSecret= "supersecret"; //process.env.JWT_SECRET,
     config.jwtAlgorithm= "HS256";//process.env.JWT_ALGO,
     config.jwtExpiration= "10h";//1h
     //config.userProperty = "token";



    module.exports = config;

/*


*/
/*
es lo mismo qe
var config = {};

config.twitter = {};
config.redis = {};
config.web = {};

config.default_stuff =  ['red','green','blue','apple','yellow','orange','politics'];
config.twitter.user_name = process.env.TWITTER_USER || 'username';
config.twitter.password=  process.env.TWITTER_PASSWORD || 'password';
config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = 'hostname';
config.redis.port = 6379;
config.web.port = process.env.WEB_PORT || 9980;

module.exports = config;
*/