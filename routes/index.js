var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    var title = 'Charles John Quarto';
    var sub = true;
    var titlesub = "Poet-Songwriter & Spiritual Teacher-Seer";
    var subtitle = 'New Collection Out. ';
    var link = 'Shop Now.';
    var image = '/images/wind.jpg';
    res.render('index', {subtitle: subtitle, title: title, titlesub: titlesub, link: link, image: image, sub: sub});
});

router.get('/shop', function(req, res) {
    var sub = false;
    var titlesub = '';
    var title = 'Shopping Coming Soon';
    var subtitle = '';
    var link = '';
    var image = '/images/nash.jpeg';
    res.render('shop', {subtitle: subtitle, title: title, link: link, image: image, titlesub: titlesub, sub: sub});
});

module.exports = router;
