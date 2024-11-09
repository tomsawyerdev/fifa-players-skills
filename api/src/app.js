
const express = require('express');
const cors = require('cors');

const config = require('./config');//sin la extension js

const sequelize = require('./db/sequelize.js');
//console.log("typeof:",typeof(sequelize),Object.keys(sequelize));

const { isCelebrateError } = require('celebrate');
const {isAuthenticated} = require('./middlewares');


// -----------------------------
// ver https://www.scaler.com/topics/expressjs-tutorial/sequelize_with_express_js/

sequelize.authenticate().then(() => {
  console.log('Database connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

// ---------------------------


var routes = require('./routes');


const app = express();

// Midlewares
// ------------------------------------------------------------
//app.use(cors({origin: 'http://192.168.1.109:3000'})); 
const corsConfig = { 
  credentials: true,
  origin:  ['http://localhost:4200'],
  methods: "HEAD,GET,POST,OPTIONS",
  maxAge:1728000, 
  //preflightContinue: false,  optionsSuccessStatus: 204
}
app.use(cors(corsConfig));
//app.use(cors({credentials: true, origin: ['http://192.168.1.109:3000','http://localhost:5000']}));


app.use(express.json());//json to body


//Math.trunc(Date.now()/1000).toString().slice(-5)

app.use((req, res, next) => {
  console.log("---------------------",req.method,": ", req.originalUrl);
  //console.log("req.body:",req.body);  
  //console.log("req.headers:",req.headers);  
  return next();
});

// ------------------------------------------------------------

//app.use(cors(), express.json(), authMiddleware);

app.get("/", function(req, res) {
  return res.send("Hello World");
});

app.get('/protected', isAuthenticated, (req, res) => {
  console.log("protected:",req.user) 
  res.send('ok');
  });

app.use('/sessions', routes.sessions);
app.use('/players',isAuthenticated, routes.players);
//app.use('/players', routes.players);


app.use('/utils',isAuthenticated, routes.utils);//for search filters: countries and teams

//---------------------------------
// Validation error handling
const errorHandling = (err, req, res, next) => {
  if (isCelebrateError(err)) {
      const errorBody = err.details.get('body');
      return res.send({
          status: 400,
          message: "Invalid request data",                    
          errors: errorBody.details[0].message.split('"').join('')
        });
  }  
  return next(err);
}

//app.use(errors());// celebrate error handler
app.use(errorHandling);
//---------------------------------


app.listen(config.port, function(){
  console.log(`Listening on port: ${config.port}, node version: ${process.version}`);
});

