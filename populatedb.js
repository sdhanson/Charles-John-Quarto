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

var photos = [];
var albums = [];
var songs = [];
// var poems = [];
// var collections = [];

function photoCreate(image, photographer, title, date, description, location, cb) {
    photodetail = {
        image: image,
        photographer: photographer
    };

    if (title !== false) photodetail.title = title;
    if (date !== false) photodetail.date = date;
    if (description !== false) photodetail.description = description;
    if (location !== false) photodetail.location = location;


    var photo = new Photo(photodetail);

    photo.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New Photo: ' + photo);
        photos.push(photo);
        cb(null, photo)
    }  );
}

function albumCreate(title, decade, artist, category, songs, image, description, producers, link, spotify, cb) {
    albumdetail = {
        title: title,
        decade: decade,
        artist: artist,
        category: category,
        songs: songs,
        image: image,
        description: description
    };
    if (producers !== false) albumdetail.producers = producers;
    if (link !== false) albumdetail.link = link;
    if (spotify !== false) albumdetail.spotify = spotify;

    var album = new Album(albumdetail);

    album.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New Album: ' + album);
        albums.push(album);
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
        description: description
    };
    if (producers !== false) songdetail.producers = producers;
    if (album !== false) songdetail.album = album;
    if (link !== false) songdetail.link = link;
    if (length !== false) songdetail.length = length;
    if (lyrics !== false) songdetail.lyrics = lyrics;
    if (spotify !== false) songdetail.spotify = spotify;

    var song = new Song(songdetail);

    song.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New Song: ' + song);
        songs.push(song);
        cb(null, song)
    });
}


//image R, photographer R, title, date, description, location, cb
function createPhotos(cb) {
    async.parallel([
            function(callback) {
                photoCreate('images/water.jpg', 'Unsplash', 'Water', '2018-06-25', false, false, callback);
            },
            function(callback) {
                photoCreate('images/mountain.jpg', 'Unsplash', false, '2018-06-25', 'A mountain before dusk', false, callback);
            },
            function(callback) {
                photoCreate('images/book.jpg', 'Unsplash', false, '2018-06-25', false, false, callback);
            },
            function(callback) {
                photoCreate('images/camera.jpg', 'Unsplash', false, '2018-06-25', false, false, callback);
            },
            function(callback) {
                photoCreate('images/ripple.jpeg', 'Unsplash', false, '2018-06-25', false, false, callback);
            },
            function(callback) {
                photoCreate('images/tree.jpeg', 'Unsplash', false, '2018-06-25', false, false, callback);
            },
            function(callback) {
                photoCreate('images/forests.jpeg', 'Unsplash', false, '2018-06-25', false, false, callback);
            },
            function(callback) {
                photoCreate('images/headshot.jpg', 'Mary Beth Cysewski ', false, false, false, 'Radnor Lake State Park', callback);
            },
            function(callback) {
                photoCreate('images/back.jpg', 'Mary Beth Cysewski ', false, false, false, 'Radnor Lake State Park', callback);
            }

        ],
        // optional callback
        cb);
}

//title, decade, artist, category, songs, image, description, producers, link, spotify, cb
function createAlbums(cb) {
    async.parallel([
            function(callback) {
                albumCreate('Songs about Nature', 'Present', ['Charles John Quarto'], 'Album', [], 'images/back.jpg',  'A new album by CJQ',  ['Charles John Quarto', 'Jimi Hendrix'], 'special_link.com', false, callback);
            },
            function(callback) {
                albumCreate('John and John', '1960', ['Charles John Quarto', 'John Lennon'], 'Collaboration', [], 'images/book.jpg',  'An album in collaboration with John Lennon',  ['Charles John Quarto', 'John Lennon'], false, 'http://youtube.com', callback);
            },
            function(callback) {
                albumCreate('By the River', '1990', ['Charles John Quarto'], 'Collaboration', [], 'images/headshot.jpg',  'A collaborative effort with Zayn Malik',  ['Charles John Quarto', 'Arnold', 'Zayn Malik'], false, false, callback);
            },
            function(callback) {
                albumCreate('Nashville Songs', '1980', ['Charles John Quarto'], 'Album', [], 'images/mountain.jpg',  'An old album',  ['Charles John Quarto'], false, false, callback);
            }
        ],
        // optional callback
        cb);
}

//title, decade, artist, category, image, description, producers, album, link, length, lyrics, spotify, cb
function createSongs(cb) {
    async.parallel([
            function(callback) {
                songCreate('Nature Song', 'Present', ['Charles John Quarto'], 'Song', 'images/headshot.jpg',  'A new song by CJQ',  ['Charles John Quarto', 'Jimi Hendrix'], albums[0], albums[0].link, "4:30", "hello", "spotify.com", callback);
            },
            function(callback) {
                songCreate('Nature Song', albums[0].decade, ['Charles John Quarto'], 'Song', 'images/mountain.jpg',  'Another song by CJQ',  albums[0].producers, albums[0], albums[0].link, "2:00", "hello FROM THE OTHER SIDE", "spotify.com", callback);
            },
            function(callback) {
                songCreate('Nature Song', '1960', ['Charles John Quarto'], 'Song', 'images/back.jpg',  'My song',  ['Charles John Quarto', 'Jimi Hendrix'], albums[0], albums[0].link, "1:34", "MORE LYRICS MORE LYRIVS", "spotify.com", callback);
            },
            function(callback) {
                songCreate('Nature Song', albums[1].decade, ['Charles John Quarto'], 'Song', 'images/music.jpg',  'This is a song',  ['Charles John Quarto', 'Jimi Hendrix'], albums[1], albums[0].link, "2:30", "hello", "spotify.com", callback);
            },
            function(callback) {
                songCreate('Nature Song', albums[2].decade, ['Charles John Quarto'], 'Song', 'images/ripple.jpeg',  'Cool song',  ['Charles John Quarto'], albums[2], albums[0].link, "8:30", "YUMADSFAHFKAJFDNARGUWAFEHJDSOIHBJFGVHOUYTYDFHGVHBJHUGYF HADSFUIHBFEFSUIVBKJANFSHUIBRKAJFNLJOIHUBAKNHBFNADHUHJ KJKIUFTYGVHJUIYTFGHJUYTFGHJIUIYGFGVHJIUIYGVBJH FDACHJBDNFJADIUHJENRFIODJKRENFJKIENRJFGUJHENRMJGFKH RIFOJENRTEGFIOJERNTJGFIVJKLRNLGFJIVFOHKRBJGFKLJFHRBJFKJFHRHBFJVJRJKBFRQKJBFK", "spotify.com", callback);
            },
            function(callback) {
                songCreate('Nature Song', '1990', ['Charles John Quarto'], 'Song', 'images/rivers.jpeg',  'Zayn',  ['Charles John Quarto', 'Jimi Hendrix'], albums[2], albums[0].link, "3:30", "COOL", "spotify.com", callback);
            },
            function(callback) {
                songCreate('Nature Song', albums[3].decade, ['Charles John Quarto'], 'Song', 'images/forests.jpeg',  'Yuh',  ['Charles John Quarto', 'Jimi Hendrix'], albums[3], albums[0].link, "5:02", false, false, callback);
            },
            function(callback) {
                songCreate('Song 8', '1960', ['Charles John Quarto', 'Bob Dylan'], 'Single', 'images/book.jpg',  'The eighth song by CJQ',  ['Charles John Quarto'], false, false, "5:30", "hello this is the eighth song he released", "http://youtube.com", callback);
            }
        ],
        // optional callback
        cb);
}

function editAlbumOne(cb) {
    Album.
    findOne({ title: albums[0].title }).
    populate('album').
    exec(function (err, album) {
        if (err) return handleError(err);
        album.songs = [songs[0], songs[1], songs[2],];
        console.log("Added new songs");
        cb();
    });
}

function editAlbumTwo(cb) {
    Album.
    findOne({ title: albums[1].title }).
    populate('album').
    exec(function (err, album) {
        if (err) return handleError(err);
        album.songs = [songs[3],];
        console.log("Added new songs 2");
        cb();
    });
}

function editAlbumThree(cb) {
    Album.
    findOne({ title: albums[2].title }).
    populate('album').
    exec(function (err, album) {
        if (err) return handleError(err);
        album.songs = [songs[4], songs[5],];
        console.log("Added new songs 3");
        console.log(album.title);
        console.log(album.songs);
        cb();
    });
}

function editAlbumFour(cb) {
    Album.
    findOne({ title: albums[3].title }).
    populate('album').
    exec(function (err, album) {
        if (err) return handleError(err);
        album.songs =  [songs[6]];
        console.log(album.title);
        console.log(album.songs);
        cb();
    });
}



async.series([
        createPhotos,
        createAlbums,
        createSongs,
        editAlbumOne,
        editAlbumTwo,
        editAlbumThree,
        editAlbumFour,

    ],
// Optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            // console.log('PhotoInstances: '+ photos);
            // console.log('AlbumInstances: '+ albums);
            // console.log('SongInstances: '+ songs);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    });