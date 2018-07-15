var express = require('express');
var nodemailer = require('nodemailer');
var validator = require('validator');
var debug = require('debug')('author');


var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    var title = 'Charles John Quarto';
    var sub = true;
    var titlesub = "Poet-Songwriter & Spiritual Teacher-Seer";
    var subtitle = 'New Collection Out. ';
    var link = 'Shop Now.';
    var image = '/images/mountain.jpg';
    res.render('index', {subtitle: subtitle, title: title, titlesub: titlesub, link: link, image: image, sub: sub});
});

router.get('/shop', function(req, res) {
    var sub = false;
    var titlesub = '';
    var title = 'Shop All Works';
    var subtitle = '';
    var link = '';
    var image = '/images/blake.jpeg';
    res.render('shop', {subtitle: subtitle, title: title, link: link, image: image, titlesub: titlesub, sub: sub});
});

router.post('/send', function(req, res) {
    req.checkBody('firstName').notEmpty();
    req.checkBody('lastName').notEmpty();
    req.checkBody('subject').notEmpty();
    req.checkBody('message').notEmpty();
    var err = req.validationErrors();
    if (err) {
        res.redirect('/contact/error');
        return;
    }

    req.sanitize('firstName').escape().trim();
    req.sanitize('lastName').escape().trim();
    req.sanitize('subject').escape().trim();
    req.sanitize('message').escape().trim();
    req.sanitize('phoneNumber').escape().trim();


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
        debug(output);

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
        debug('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        debug('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.redirect('/contact/sent');
    });
    // });

});

module.exports = router;
