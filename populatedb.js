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
var Poem = require('./models/poem');
var Collection = require('./models/book');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var photos = [];
var albums = [];
var songs = [];
var poems = [];
var collections = [];

function photoCreate(image, photographer, title, date, description, location, cb) {
    photodetail = {
        image: image,
        photographer: photographer
    };

    if (title !== false) {
        photodetail.title = title;
    } else {
        photodetail.title = null;
    }
    if (date !== false) {
        photodetail.date = date;
    } else {
        photodetail.date = null;
    }
    if (description !== false) {
        photodetail.description = description;
    } else {
        photodetail.description = null;
    }
    if (location !== false) {
        photodetail.location = location;
    } else {
        photodetail.location = null;
    }


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

function albumCreate(title, decade, artist, category, songs, image, description, producers, link, spotify, label, cb) {
    albumdetail = {
        title: title,
        decade: decade,
        artist: artist,
        category: category,
        songs: songs,
        image: image,
        description: description
    };
    if (producers !== false) {
        albumdetail.producers = producers;
    } else {
        albumdetail.producers = null;
    }
    if (link !== false) {
        albumdetail.link = link;
    } else {
        albumdetail.link = null;
    }
    if (spotify !== false) {
        albumdetail.spotify = spotify;
    } else {
        albumdetail.spotify = null;
    }
    if (label !== false) {
        albumdetail.label = label;
    } else {
        albumdetail.label = null;
    }

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
// title, decade, year, artist, category, image, display, producers, album, link, length, lyrics, spotify, label, cb
function songCreate(title, decade, year, artist, category, image, display, producers, album, link, length, lyrics, spotify, label, cb) {
    songdetail = {
        title: title,
        decade: decade,
        year: year,
        artist: artist,
        category: category,
        display: display
    };
    if (image !== false) {
        songdetail.image = image;
    } else {
        songdetail.image = null;
    }
    if (producers !== false) {
        songdetail.producers = producers;
    } else {
        songdetail.producers = null;
    }
    if (album !== false) {
        songdetail.album = album;
    } else {
        songdetail.album = null;
    }
    if (link !== false) {
        songdetail.link = link;
    } else {
        songdetail.link = null;
    }
    if (length !== false) {
        songdetail.length = length;
    } else {
        songdetail.length = null;
    }
    if (lyrics !== false) {
        songdetail.lyrics = lyrics;
    } else {
        songdetail.lyrics = null;
    }
    if (spotify !== false) {
        songdetail.spotify = spotify;
    } else {
        songdetail.spotify = null;
    }
    if (label !== false) {
        songdetail.label = label;
    } else {
        songdetail.label = null;
    }

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

function poemCreate(title, author, image, decade, year, category, body, book, link, display, cb) {
    poemdetail = {
        title: title,
        author: author,
        decade: decade,
        year: year,
        category: category,
        body: body,
        display: display
    };
    if (image !== false) {
        poemdetail.image = image;
    } else {
        poemdetail.image = null;
    }
    if (book !== false) {
        poemdetail.book = book;
    } else {
        poemdetail.book = null;
    }
    if (link !== false) {
        poemdetail.link = link;
    } else {
        poemdetail.link = null;
    }

    var poem = new Poem(poemdetail);

    poem.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New Poem: ' + poem);
        poems.push(poem);
        cb(null, poem)
    });
}


//image R, photographer R, title, date, description, location, cb
function createPhotos(cb) {
    async.parallel([
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
                albumCreate('CJQ Album 1', 'Present', ['Charles John Quarto'], 'Album', [], 'images/back.jpg',  'A new album by CJQ',  ['Charles John Quarto'], 'special_link.com', false, false, callback);
            },
            // function(callback) {
            //     albumCreate('John and John', '1960', ['Charles John Quarto', 'John Lennon'], 'Collaboration', [], 'images/book.jpg',  'An album in collaboration with John Lennon',  ['Charles John Quarto', 'John Lennon'], false, 'http://youtube.com', callback);
            // },
            function(callback) {
                albumCreate('CJQ Album 2', '1990', ['Charles John Quarto'], 'Collaboration', [], 'images/headshot.jpg',  'A collaborative effort with Willie Nelson',  ['Charles John Quarto', 'Willie Nelson'], false, false, false, callback);
            },
            // function(callback) {
            //     albumCreate('Nashville Songs', '1980', ['Charles John Quarto'], 'Album', [], 'images/mountain.jpg',  'An old album',  ['Charles John Quarto'], false, false, callback);
            // }
        ],
        // optional callback
        cb);
}

// title, decade, year, artist, category, image, display, producers, album, link, length, lyrics, spotify, label, cb
function createSongs(cb) {
    async.parallel([
            function(callback) {
                songCreate('THE WIND BECOMES COYOTE ', 'Present', '2013', ['Charles John Quarto'], 'Song', false, 'The wind becomes coyote',  false, false, false, false, ['The wind becomes coyote',
                    'Echoes blue Oklahoma',
                    'The first Sunday in October',
                    'Come symbols made of moon',
                    'Scarecrow knows he’ll be a snowman soon',
                    '\n',
                    'Winter seals the prairie',
                    'Stitches back the story',
                    'In Indian time',
                    'The fire below the panhandle',
                    'Is an uprising sign',
                    'It taught the river',
                    'How to wind around the town',
                    'Leaving in its traces',
                    'An endless distant sound',
                    '\n',
                    'It took forever',
                    'To lead us to this place',
                    'We’ll take forever with us',
                    'In the coming of the days,',
                    '\n',
                    'The wind becomes coyote',
                    'Echoes blue Oklahoma',
                    'The first Sunday in October',
                    'Come symbols made of moon',
                    'Scarecrow knows he’ll be a snowman soon'], false, false, callback);
            },
        ],
        // optional callback
        cb);
}

// title, author, image, decade, year, category, body, book, link, display, cb
function createPoems(cb) {
    async.parallel([
            function(callback) {
                poemCreate('THE GREATEST', 'Charles John Quarto', false, '1980', '1982', 'Poem', ['The greatest event I ever saw',
                    'Took place in the Catskill Mountains',
                    'When Harry Blankley my grandfather',
                    'Threw rocks at a low flying helicopter',
                    'Not understanding those confounded things',
                    'While I stood with my dumbfounded cousins',
                'And watched the greatest event I ever saw',
                'It was the greatest breaking of the Law'],  false,  false, 'The greatest event I ever saw', callback);
            },
        ],
        // optional callback
        cb);
}

async.series([
        createPhotos,
        createAlbums,
       createSongs,
        createPoems
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