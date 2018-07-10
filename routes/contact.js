var express = require('express');
var router = express.Router();

router.get('/:specifier', function(req, res, next) {
    var specifier = req.params.specifier.toLowerCase();
    var sent = false;
    var error = false;
    if(specifier === 'sent' ) {
        sent = true;
    } else if(specifier === 'error') {
        error = true;
    } else {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
    var title = 'Contact';
    var subtitle = 'Submit Your Message.';
    var link = '';
    var image = '/images/tree.jpeg';
    var sub = false;
    var titlesub = '';

    res.render('contact', {subtitle: subtitle, title: title, link: link, image: image, sent: sent, error: error, titlesub: titlesub, sub: sub});
});

router.get('/', function(req, res) {
    var title = 'Contact';
    var subtitle = 'Submit Your Message.';
    var link = '';
    var image = '/images/tree.jpeg';
    var sent = false;
    var error = false;
    var sub = false;
    var titlesub = '';
    res.render('contact', {subtitle: subtitle, title: title, link: link, image: image, sent: sent, error: error, titlesub: titlesub, sub: sub});
});

router.get('/', function(req, res) {
    var title = 'Contact';
    var subtitle = 'Submit Your Message.';
    var link = '';
    var image = '/images/tree.jpeg';
    var sent = false;
    var error = false;
    var sub = false;
    var titlesub = '';
    res.render('contact', {subtitle: subtitle, title: title, link: link, image: image, sent: sent, error: error, titlesub: titlesub, sub: sub});
});


module.exports = router;