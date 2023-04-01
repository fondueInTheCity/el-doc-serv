var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const usersRouter = require("./routes/user.router")
const filesRouter = require('./routes/file.router')
const authRouter = require('./routes/auth.router')

const db = require('./models')
const Role = db.roles

var app = express();

const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `http://localhost:3006`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(allowCrossDomain);

app.use('/api/users', usersRouter);
app.use('/api/files', filesRouter)
app.use('/api/auth', authRouter)
app.use((err, req, res, next) => {
  res.status(err.statusCode || err.status || 500)
    .json(err.message)
})

db.sequelize.sync({ force: true })
  .then(() => {
    initial()
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: ", err.message);
  });

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}

module.exports = app;
