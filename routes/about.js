var express = require('express');
var router = express.Router();


/* ABOUT */
router.get('/', function(req, res) {
    var sub = false;
    var titlesub = '';
    var title = 'Charles John Quarto';
    var subtitle = 'The Life and Work';
    var link = '';
    var image = '/images/ripple.jpeg';
    res.render('about', {subtitle: subtitle, title: title, link: link, image: image, titlesub: titlesub, sub: sub});
});
/* END ABOUT */

module.exports = router;