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


router.get('/discography/decade/:specifier', function(req, res, next) {
    if(req.params.specifier === "1960s" || req.params.specifier === "1970s" || req.params.specifier === "1980s" || req.params.specifier === "1990s" || req.params.specifier === "2000s" || req.params.specifier === "Present") {
        res.redirect('/music/decade/' + req.params.specifier);
    } else {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

router.get('/discography/category/:specifier', function(req, res, next) {
    if(req.params.specifier === "Collaboration"|| req.params.specifier === "Single") {
        res.redirect('/music/category/' + req.params.specifier);
    } else if (req.params.specifier === "Album"  || req.params.specifier === "Song" ) {
        res.redirect('/music/' + req.params.specifier);
    } else{
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

router.get('/discography', function(req, res) {
    res.redirect('/music');
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

router.get('/written-works/decade/:specifier', function(req, res) {
    if(req.params.specifier == "1960s" || req.params.specifier == "1970s" || req.params.specifier == "1980s" || req.params.specifier == "1990s" || req.params.specifier == "2000s" || req.params.specifier == "Present") {
        res.redirect('/writing/decade/' + req.params.specifier);
    }  else{
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

router.get('/written-works/work/:specifier', function(req, res) {
    if(req.params.specifier == "poems" || req.params.specifier == "songs" || req.params.specifier == "collections") {
        res.redirect('/writing/' + req.params.specifier);
    } else{
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

router.get('/written-works/:type/:specifier', function(req, res) {
    if(req.params.type == "song" || req.params.type == "book" || req.params.type == "poem" ) {
        res.redirect('/writing/' + req.params.type + "/" + req.params.specifier);
    } else{
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

router.get('/written-works', function(req, res) {
    res.redirect('/writing');
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
