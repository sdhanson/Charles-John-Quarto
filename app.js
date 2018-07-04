var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photographyRouter = require('./routes/photo');
var musicRouter = require('./routes/music');
var writtenworkRouter = require('./routes/writing');


var app = express();

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/cjq';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/photo', photographyRouter);
app.use('/music', musicRouter);
app.use('/writing', writtenworkRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    var title = 'Error';
    var subtitle = 'The page you are looking for cannot be found!';
    var link = 'Head back to safety.';
    var image = '/images/storm.jpeg';
  res.status(err.status || 500);
  res.render('error', {subtitle: subtitle, title: title, link: link, image: image});
});

module.exports = app;
