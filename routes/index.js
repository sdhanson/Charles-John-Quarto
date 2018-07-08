var express = require('express');
var nodemailer = require('nodemailer');
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
    var page = req.params.specifier.toLowerCase();
    if(page === "1960" || page === "1970" || page === "1980" || page === "1990" || page === "2000" || page === "present") {
        res.redirect('/music/decade/' + page);
    } else {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

router.get('/discography/category/:specifier', function(req, res, next) {
    var page = req.params.specifier.toLowerCase();
    if(page === "collaboration"|| page === "single") {
        res.redirect('/music/category/' + page);
    } else if (page === "album"  || page === "song" ) {
        res.redirect('/music/category/' + page);
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
});

router.get('/about', function(req, res) {

    var title = 'Charles John Quarto';
    var subtitle = 'The Life and Work';
    var link = '';
    var image = '/images/ripple.jpeg';
    res.render('about', {subtitle: subtitle, title: title, link: link, image: image});
});

router.get('/written-works/decade/:specifier', function(req, res, next) {
    var page = req.params.specifier.toLowerCase();
    if(page === "1960" || page === "1970" || page === "1980" || page === "1990" || page === "2000" || page === "present") {
        res.redirect('/writing/decade/' + page);
    }  else{
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

router.get('/written-works/category/:specifier', function(req, res, next) {
    var page = req.params.specifier.toLowerCase();
    if(page === "poems" || page === "songs" || page === "collections") {
        res.redirect('/writing/category/' + page);
    } else{
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

router.get('/written-works/:type/:specifier', function(req, res, next) {
    var id = req.params.specifier;
    var type = req.params.type.toLowerCase();
    if(type === "song" || type === "book" || type === "poem" ) {
        res.redirect('/writing/' + type + "/" + id);
    } else{
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

router.get('/written-works', function(req, res) {
    res.redirect('/writing');
});

router.get('/contact/:specifier', function(req, res, next) {
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

    res.render('contact', {subtitle: subtitle, title: title, link: link, image: image, sent: sent, error: error});
});

router.get('/contact', function(req, res) {
    var title = 'Contact';
    var subtitle = 'Submit Your Message.';
    var link = '';
    var image = '/images/tree.jpeg';
    var sent = false;
    var error = false;
    res.render('contact', {subtitle: subtitle, title: title, link: link, image: image, sent: sent, error: error});
});

router.get('/contact', function(req, res) {
    var title = 'Contact';
    var subtitle = 'Submit Your Message.';
    var link = '';
    var image = '/images/tree.jpeg';
    var sent = false;
    var error = false;
    res.render('contact', {subtitle: subtitle, title: title, link: link, image: image, sent: sent, error: error});
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

router.post('/send', function(req, res) {
    var output = "<p> You have a new contact request </p>" +
        "<h3> Contact Details </h3>" +
        "<ul> <li> Name: " +
        req.body.firstName + req.body.lastName +
        "</li> <li>Subject: "
        + req.body.subject +
        "</li><li> Phone: " +
        req.body.phoneNumber +
        "</li> </ul> <h3> Message: </h3> "
        + req.body.message;
    console.log(output);

    // nodemailer.createTestAccount(function(err, account) {
        // create reusable transporter object using default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'qi67zyeiy35d4k5m@ethereal.email',
            pass: 'tKsCUc59aTkQdpj3WV'
        },
        // only because we are from local host
        tls: {
            rejectUnauthorized: false
        }
    });

        // setup email data with unicode symbols
        var mailOptions = {
            from: '"NodeMailer Contact" <iybdurno2bsdxbds@ethereal.email>', // sender address
            to: 'cjq.website98@gmail.com', // list of receivers
            subject: 'hello there', // Subject line
            text: 'hello', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                res.redirect('/contact/error');
                return;
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.redirect('/contact/sent');
        });
    // });




});
/* GET about page */
// app.get('/about', function(req, res) {
//   res.render('about');
// });

module.exports = router;
