var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testJson = require('./routes/testJson');
var upload = require('./routes/upload');

var app = express();

app.all('*', function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "http://localhost:8474");
  // res.header("Access-Control-Allow-Origin", "http://10.111.70.80:4202");
  // res.header("Access-Control-Allow-Origin", "http://localhost:8877");
  // res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  // res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Origin", "http://localhost:8903");
  // res.header("Access-Control-Allow-Origin", "http://10.111.70.80:1234");
  // res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,Cookie');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testJson', testJson);
app.use('/upload', upload);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;