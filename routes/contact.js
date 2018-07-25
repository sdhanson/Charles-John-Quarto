var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var validator = require('validator');
var debug = require('debug')('author');

router.route('/')
    .all(function(req, res, next) {
        debug("Ajax here");
        next();
    })
    .get(function(req, res) {
            var title = 'Contact';
            var subtitle = 'Submit Your Message.';
            var link = '';
            var image = '/images/road.jpg';
            var sub = false;
            var titlesub = '';
            res.render('contact', {subtitle: subtitle, title: title, link: link, image: image, titlesub: titlesub, sub: sub});
    }).post(function(req, res) {

        // Validate incoming email body
        req.checkBody('firstName').notEmpty();
        req.checkBody('lastName').notEmpty();
        req.checkBody('subject').notEmpty();
        req.checkBody('message').notEmpty();

        var err = req.validationErrors();
        if (err) {
            res.end({error : "Validation Error: " + err, status : 500});
        }

        // Sanitize incoming email body
        req.sanitize('firstName').escape().trim();
        req.sanitize('lastName').escape().trim();
        req.sanitize('subject').escape().trim();
        req.sanitize('message').escape().trim();
        req.sanitize('phoneNumber').escape().trim();

        // Create message for email
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

        // Set up email server
        const poolConfig = {
            pool: true,
            host: 'smtp-relay.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'cjq.website@gmail.com',
                pass: '27}}u3hXej+%\\bRY%'
            },
            tls: {
                rejectUnauthorized: false
            }
        };

        // create reusable transporter object using default SMTP transport
        const transporter = nodemailer.createTransport(poolConfig);

        // setup email data with unicode symbols
        var mailOptions = {
            from: 'cjq.website@gmail.com', // sender address
            to: 'cjq.website@gmail.com', // list of receivers
            subject: 'hello there', // Subject line
            text: 'hello', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                debug(err);
                res.end({error : "Transporter Connection Error: " + err, status : 500});
            }
            debug('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            debug('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.end({success : "Email Sent Successfully", status : 200});
        });

    });


module.exports = router;