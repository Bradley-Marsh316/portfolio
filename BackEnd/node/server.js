require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const api = require('./src/api');

//Logger
app.use(logger('dev'));

//Parser body
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//Basic security
app.use(helmet());

//Passport  
app.use(passport.initialize());
app.use(passport.session());



// Basic cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.get('/', (req,res) => {
  res.status(200).json({message: 'Looking good'})
})

app.use(api);

let server;

module.exports = {
  start(port) {
    server = app.listen(port, () => {
      console.log(`App started on port ${port}`);
    })
    return app
  },
  stop() {
    server.close();
  }
}