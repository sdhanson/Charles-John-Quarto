var express = require('express');
var app = express();
// var router = express.Router();

app.set('view engine', 'ejs');

/* GET home page. */
app.get('/', function(req, res) {

    var title = 'Charles John Quarto: Songwriter-Poet';
    var subtitle = 'New Collection Out. ';
    var link = 'Shop Now.';
    var image = '/images/mountain.jpg';
    res.render('index', {subtitle: subtitle, title: title, link: link, image: image});
});

app.get('/discography', function(req, res) {

    var title = 'Discography';
    var subtitle = '';
    var link = '';
    var image = '/images/mountain.jpg';
    res.render('discography', {subtitle: subtitle, title: title, link: link, image: image});
});


/* GET about page */
// app.get('/about', function(req, res) {
//   res.render('about');
// });

module.exports = app;
