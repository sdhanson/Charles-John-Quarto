// import packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var expressValidator = require('express-validator');
var logger = require('morgan');
var compression = require('compression');
var helmet = require('helmet');
require('dotenv').config();


// available routes setup
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photographyRouter = require('./routes/photography');
var musicRouter = require('./routes/discography');
var writtenworkRouter = require('./routes/written-works');
var contactRouter = require('./routes/contact');
var aboutRouter = require('./routes/about');


// app start
var app = express();

// mongodb database setup
var mongoose = require('mongoose');
// var mongoDB = 'mongodb://127.0.0.1:27017/cjq';
// mongoose.connect('mongodb://127.0.0.1:27017/cjq');
mongoose.connect(process.env.DB_HOST+ "://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@ds131971.mlab.com:31971/" + process.env.DB_NAME);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// compression set up
app.use(compression());

// logger middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookieparser middleware setup
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// bodyparser middleware setup
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// security set up
app.use(helmet());

// express validator set up
app.use(expressValidator());


// router set up

app.use('/users', usersRouter);
app.use('/photography', photographyRouter);
app.use('/discography', musicRouter);
app.use('/written-works', writtenworkRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);
app.use('/', indexRouter);

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
    var sub = false;
    var titlesub ='';
    var title = 'Error';
    var subtitle = 'The page you are looking for cannot be found!';
    var link = 'Head back to safety.';
    var image = '/images/storm.jpeg';
  res.status(err.status || 500);
  res.render('error', {subtitle: subtitle, title: title, link: link, image: image, sub: sub, titlesub: titlesub });
});

module.exports = app;
// adding this to commit
