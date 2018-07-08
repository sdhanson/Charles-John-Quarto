#! /usr/bin/env node

console.log('This script populates some test photos to my database. Specified database as argument - e.g.: populatedb mongodb://127.0.0.1:27017/cjq');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async');
var Photo = require('./models/photo');
var Album = require('./models/album');
var Song = require('./models/song');
// var Poem = require('./models/poem');
// var Collection = require('./models/book');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


Song.findOne({title: 'NO LYRICS'}, function(err, song) {
    Album.findOneAndUpdate(
        { title: 'Nashville Songs'},
        { $push: { songs: song  } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
});

Song.findOne({title: 'song 6'}, function(err, song) {
    Album.findOneAndUpdate(
        { title: 'By the River'},
        { $push: { songs: song  } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
});

Song.findOne({title: 'song 5'}, function(err, song) {
    Album.findOneAndUpdate(
        { title: 'By the River'},
        { $push: { songs: song  } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
});

Song.findOne({title: 'song 4'}, function(err, song) {
    Album.findOneAndUpdate(
        { title: 'John and John'},
        { $push: { songs: song  } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
});

Song.findOne({title: 'another song'}, function(err, song) {
    Album.findOneAndUpdate(
        { title: 'John and John'},
        { $push: { songs: song  } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
});

Song.findOne({title: 'New song'}, function(err, song) {
    Album.findOneAndUpdate(
        { title: 'John and John'},
        { $push: { songs: song  } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
});

Song.findOne({title: 'Nature Song'}, function(err, song) {
    Album.findOneAndUpdate(
        { title: 'Songs about Nature'},
        { $push: { songs: song  } },
        function (error, success) {
            if (error) {
                console.log(error);
                mongoose.connection.close();
            } else {
                console.log(success);
                mongoose.connection.close();
            }
        });
});

