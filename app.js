var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const usersRouter = require("./routes/user.routes.js");


var app = express();


const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `http://localhost:3006`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(allowCrossDomain);

app.use('/auth', indexRouter);
app.use('/api/users', usersRouter);

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: ", err.message);
  });

module.exports = app;
