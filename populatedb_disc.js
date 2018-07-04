#! /usr/bin/env node

console.log('This script populates some test albums/songs to my database. Specified database as argument - e.g.: populatedb mongodb://127.0.0.1:27017/cjq');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Album = require('./models/album')
var Song = require('./models/song')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var albums = [];
var songs = [];

Album.deleteMany({});
Song.deleteMany({});

function albumCreate(title, decade, artist, category, songs, image, description, producers, link, spotify, cb) {
    albumdetail = {
        title: title,
        decade: decade,
        artist: artist,
        category: category,
        songs: songs,
        image: image,
        description: description,
    }
    if (producers != false) albumdetail.producers = producers
    if (link != false) albumdetail.link = link
    if (spotify != false) albumdetail.spotify = spotify

    var album = new Album(albumdetail);

    album.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Album: ' + album);
        albums.push(album)
        cb(null, album)
    }  );
}

function songCreate(title, decade, artist, category, image, description, producers, album, link, length, lyrics, spotify, cb) {
    songdetail = {
        title: title,
        decade: decade,
        artist: artist,
        category: category,
        songs: songs,
        image: image,
        description: description,
    }
    if (producers != false) songdetail.producers = producers
    if (album != false) songdetail.album = album
    if (link != false) songdetail.link = link
    if (length != false) songdetail.length = length
    if (lyrics != false) songdetail.lyrics = lyrics
    if (spotify != false) songdetail.spotify = spotify

    var song = new Song(songdetail);

    song.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Song: ' + song);
        songs.push(song)
        cb(null, song)
    });
}


function createAlbums(cb) {
    async.parallel([
            function(callback) {
                albumCreate('Songs about Nature', 'Present', ['Charles John Quarto'], 'Album', ['Song1'], 'images/back.jpg',  'A new album by CJQ',  ['Charles John Quarto', 'Jimi Hendrix'], false, false, callback);
            },
        ],
        // optional callback
        cb);
}

function createSongs(cb) {
    async.parallel([
            function(callback) {
                songCreate('Nature Song', 'Present', ['Charles John Quarto'], 'Single', 'images/headshot.jpg',  'A new song by CJQ',  ['Charles John Quarto', 'Jimi Hendrix'], "ALBUM REF", "shop.com", "4:30", "hello", "spotify.com", callback);
            },
        ],
        // optional callback
        cb);
}




async.series([
        createAlbums,
        createSongs,
    ],
// Optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            console.log('AlbumInstances: '+albums);
            console.log('SongInstances: '+songs);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });