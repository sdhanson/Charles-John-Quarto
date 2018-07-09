#! /usr/bin/env node

console.log('This script populates some test photos to my database. Specified database as argument - e.g.: populatedb mongodb://127.0.0.1:27017/cjq');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async');
var Poem = require('./models/poem');
var Collection = require('./models/book');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var collection = new Collection({
    title: 'When my Sister Fell Out of the Maple Tree',
    decade: 'Present',
    poems: []
});

// / SET THE THINGS YOU DONT SET TO FALSE
collection.save(function (err) {
    if (err) console.log(error);

    var story1 = new Poem({
        title: 'Taking Up the Fiddle',
        decade: 'Present',
        body: "It’s never too late to take up the fiddle\n" +
        "Might be you’re a little itchy\n" +
        "On down in Kentucky\n" +
        "From watching the grass burn blue\n" +
        "Or maybe your dream got scratched from the Derby\n" +
        "And your ticket just tore you in two\n" +
        "Or maybe you’re waiting for a letter from Lonesome\n" +
        "But Lonesome’s not lonesome for you\n" +
        "\nThat old barn’s gonna peel in the summer sun\n" +
        "But that won’t matter if you stay in the shade\n" +
        "Break out the rosin and the lemonade\n" +
        "Set it on down by the orange crate\n" +
        "And play “Polly Wolly Doodle” and “Hey Diddle” too\n" +
        "It’s never too late to take up the fiddle\n" +
        "You’re always on time when you tap your shoe.....",
        book: collection._id,
    });

    story1.save(function (err) {
        if (err) console.log(error);
        mongoose.connection.close();
    });
});

