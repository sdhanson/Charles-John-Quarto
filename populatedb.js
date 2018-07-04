#! /usr/bin/env node

console.log('This script populates some test photos to my database. Specified database as argument - e.g.: populatedb mongodb://127.0.0.1:27017/cjq');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Photo = require('./models/photo')
// var Author = require('./models/author')
// var Genre = require('./models/genre')
// var BookInstance = require('./models/bookinstance')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var photos = []

Photo.deleteMany({});

function photoCreate(title, image, date, photographer, description, location, cb) {
    photodetail = {
        title: title,
        image: image,
        date: date
    }
    if (photographer != false) photodetail.photographer = photographer
    if (description != false) photodetail.description = description
    if (location != false) photodetail.location = location

    var photo = new Photo(photodetail);

    photo.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Photo: ' + photo);
        photos.push(photo)
        cb(null, photo)
    }  );
}



function createPhotos(cb) {
    async.parallel([
            function(callback) {
                photoCreate('Water', 'images/water.jpg', '2018-06-25', false, false, false, callback);
            },
            function(callback) {
                photoCreate('Mountain', 'images/mountain.jpg', '2018-06-25', false, false, false, callback);
            },
            function(callback) {
                photoCreate('Book', 'images/book.jpg', '2018-06-25', false, false, false, callback);
            },
            function(callback) {
                photoCreate('Camera', 'images/camera.jpg', '2018-06-25', false, false, false, callback);
            },
            function(callback) {
                photoCreate('Ripple', 'images/ripple.jpeg', '2018-06-25', false, false, false, callback);
            },
            function(callback) {
                photoCreate('Tree', 'images/tree.jpeg', '2018-06-25', false, false, false, callback);
            },
            function(callback) {
                photoCreate('Forests', 'images/forests.jpeg', '2018-06-25', false, false, false, callback);
            },
            function(callback) {
                photoCreate('Headshot', 'images/headshot.jpg', '2018-06-25', 'Mary Beth Cysewski ', false, 'Radnor Lake State Park', callback);
            },
            function(callback) {
                photoCreate('Back', 'images/back.jpg', '2018-06-25', 'Mary Beth Cysewski ', false, 'Radnor Lake State Park', callback);
            },

        ],
        // optional callback
        cb);
}




async.series([
        createPhotos,
    ],
// Optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            console.log('PhotoInstances: '+photos);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });