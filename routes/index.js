var express = require('express');
// var app = express();
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {

    var title = 'Charles John Quarto: Songwriter-Poet';
    var subtitle = 'New Collection Out. ';
    var link = 'Shop Now.';
    var image = '/images/mountain.jpg';
    res.render('index', {subtitle: subtitle, title: title, link: link, image: image});
});

router.get('/discography/:specifier', function(req, res) {
    if(req.params.specifier == "Album" || req.params.specifier == "Collaboration" || req.params.specifier == "Song" || req.params.specifier == "Single") {
        res.redirect('/music/category/' + req.params.specifier);
    } else if(req.params.specifier == "1960s" || req.params.specifier == "1970s" || req.params.specifier == "1980s" || req.params.specifier == "1990s" || req.params.specifier == "2000s" || req.params.specifier == "Present") {
        res.redirect('/music/decade/' + req.params.specifier);
    }

    // res.render('discography', {subtitle: subtitle, title: title, link: link, image: image});
});

router.get('/discography', function(req, res) {
    res.redirect('/music');
    // res.render('discography', {subtitle: subtitle, title: title, link: link, image: image});
});

router.get('/photography', function(req, res) {
    res.redirect('/photo');
    // res.render('photography', {subtitle: subtitle, title: title, link: link, image: image});
});

router.get('/about', function(req, res) {

    var title = 'Charles John Quarto';
    var subtitle = 'The Life and Work';
    var link = '';
    var image = '/images/ripple.jpeg';
    res.render('about', {subtitle: subtitle, title: title, link: link, image: image});
});

router.get('/written-works', function(req, res) {
    // res.redirect('/writing');

    var title = 'Written Works';
    var subtitle = 'Poetry and Lyrics. ';
    var link = 'Shop Now.';
    var image = '/images/water.jpg';
    res.render('written-works', {subtitle: subtitle, title: title, link: link, image: image});
});

router.get('/contact', function(req, res) {

    var title = 'Contact';
    var subtitle = 'Submit Your Message.';
    var link = '';
    var image = '/images/tree.jpeg';
    res.render('contact', {subtitle: subtitle, title: title, link: link, image: image});
});

router.get('/poem', function(req, res) {

    var title = 'Poem';
    var subtitle = '';
    var link = '';
    var image = '/images/tree.jpeg';
    res.render('poem', {subtitle: subtitle, title: title, link: link, image: image});
});

router.get('/shop', function(req, res) {

    var title = 'Shop All Works';
    var subtitle = '';
    var link = '';
    var image = '/images/blake.jpeg';
    res.render('shop', {subtitle: subtitle, title: title, link: link, image: image});
});


/* GET about page */
// app.get('/about', function(req, res) {
//   res.render('about');
// });

module.exports = router;
