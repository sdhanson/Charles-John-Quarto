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
    var image = '/images/rocks.jpeg';
    res.render('discography', {subtitle: subtitle, title: title, link: link, image: image});
});

app.get('/photography', function(req, res) {

    var title = 'Photo Gallery';
    var subtitle = '';
    var link = '';
    var image = '/images/rivers.jpeg';
    res.render('photography', {subtitle: subtitle, title: title, link: link, image: image});
});

app.get('/about', function(req, res) {

    var title = 'Charles John Quarto';
    var subtitle = 'The Life and Work';
    var link = '';
    var image = '/images/ripple.jpeg';
    res.render('about', {subtitle: subtitle, title: title, link: link, image: image});
});

app.get('/written-works', function(req, res) {

    var title = 'Written Works';
    var subtitle = 'Poetry and Lyrics. ';
    var link = 'Shop Now.';
    var image = '/images/water.jpg';
    res.render('written-works', {subtitle: subtitle, title: title, link: link, image: image});
})

app.get('/contact', function(req, res) {

    var title = 'Contact';
    var subtitle = 'Submit Your Message.';
    var link = '';
    var image = '/images/tree.jpeg';
    res.render('contact', {subtitle: subtitle, title: title, link: link, image: image});
});

app.get('/poem', function(req, res) {

    var title = 'Poem';
    var subtitle = '';
    var link = '';
    var image = '/images/tree.jpeg';
    res.render('poem', {subtitle: subtitle, title: title, link: link, image: image});
});


/* GET about page */
// app.get('/about', function(req, res) {
//   res.render('about');
// });

module.exports = app;
