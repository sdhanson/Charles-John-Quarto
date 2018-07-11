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
                songCreate('THE WIND BECOMES COYOTE', 'Present', '2013', ['Charles John Quarto'], 'Song', false, 'The wind becomes coyote',  false, false, false, false, ['The wind becomes coyote',
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
            function(callback) {
                songCreate('THE OLD LOST CANYON LULLABY', 'Present', '2013', ['Charles John Quarto'], 'Song', false, 'From up in the treehouse',  false, false, false, false, [
                    'From up in the treehouse',
                    'Through the eyes of a child',
                    'The crop circle’s',
                    'A sure sundial',
                    'And the summer’s in',
                    'No rush at all',
                    '’Round the grand old magnolia parasol',
                    '\n',
                    'And the garden of the heart',
                    'Sings in flowers',
                    'Songs made out of sky',
                    'It’s the Old Lost Canyon Lullaby',
                    'The birds that I see through your eyes',
                    'And the moon goes cloudy when you cry',
                    'It’s the Old Lost Canyon Lullaby',
                    '\n',
                    'It’s the Cheyenne Tribe',
                    'Come down from the stars',
                    'To consecrate this world of ours',
                    'Go West until the road turns red',
                    'There’s an amethyst of an arrowhead',
                    'And every snowflake struck a chord',
                    'Out in the blue and bye',
                    'It’s the Old Lost Canyon Lullaby',
                    '\n',
                    'From up in the treehouse',
                    'We could always tell',
                    'That wisdom is a whiporwil',
                    'And she’ll cross the prairie',
                    'In a sigh',
                    'It’s the Old Lost Canyon Lullaby',
                    '\n',
                    'Conductor cactus with baton',
                    'Sainted sagebrush symphony',
                    'All in the hush of love',
                    'Silence never sounded so free',
                    '\n',
                    'It’s the Cheyenne Tribe',
                    'Come down from the stars',
                    'To consecrate this world of ours',
                    'Go West until the road turns red',
                    'There’s an amethyst of an arrowhead',
                    'And every snowflake struck a chord',
                    'Out in the blue and bye',
                    'It’s the Old Lost Canyon Lullaby'], false, false, callback);
            },
            function(callback) {
                songCreate('THE LILAC IN YOU', 'Present', '2013', ['Charles John Quarto'], 'Song', false, 'This is the morning I\'ll sing',  false, false, false, false, [
                    'This is the morning I’ll sing',
                    'Every thought I have held in my wings',
                    'Each time that you touched my heart just by being',
                    'Now whatever I do I am dreaming',
                    '\n',
                    'In the subtle splendors of your arms',
                    'The golden graces of the stars',
                    'That have taken their perfect places',
                    'So that we might take ours',
                    '\n',
                    'Love brings out the lilac in you',
                    'Sunrise is blushing the walls',
                    'Follow the shadows',
                    'Back down the hall to the blue',
                    'But love brings out the lilac in you',
                    '\n',
                    'Oh maybe there’s ghosts on the moon',
                    'As surely there’s bliss in this world',
                    'The garden of evening begins',
                    'To open the flowers we are',
                    '\n',
                    'Remember that walk up to Jupiter Hill',
                    'When our little town stood so still',
                    'The more you’re with me the more it will',
                    '\n',
                    'Love brings out the lilac in you',
                    'Sunrise is blushing the walls',
                    'Follow the shadows',
                    'Back down the hall to the blue',
                    'But love brings out the lilac in you',
                    '\n',
                    'Heaven is in bloom',
                    'As it was meant to do',
                    'Love brings out the lilac in you'], false, false, callback);
            },
            function(callback) {
                songCreate('THE PARABLE POEM', 'Present', '2013', ['Charles John Quarto'], 'Song', false, 'This is the morning I\'ll sing',  false, false, false, false, [
                    'I am the wolf as well as the lamb',
                    'God bless you mother and father god damn',
                    'Blue jeans and blue eyes hang upon hell',
                    'The angel in my manger is the devil as well',
                    '\n',
                    'I am the wolf as well as the lamb',
                    'Dear girls in a garden in near Viet Nam',
                    'Two dozen lone roses and two quick beers',
                    'A million murders in my twenty-six years',
                    '\n',
                    'Lamb on your table wolf in your head',
                    'Priest in your heart and beast in your bed',
                    'I am the fire as well as the water',
                    'God gave his son and God help your daughter',
                    '\n',
                    'Wolf on your shelf Christ in your stable',
                    'Grace in your face and snake in your cradle',
                    'I am the water as well as the fire',
                    'I am the lyre and I am a liar'], false, false, callback);
            },
            function(callback) {
                songCreate('IN THE FACE OF THE LOOKING GLASS MOON', 'Present', '2013', ['Charles John Quarto'], 'Song', false, 'This is the morning I\'ll sing',  false, false, false, false, [
                    'Love with you',
                    'Was like handing my heart',
                    'Through a broken window',
                    'In the dark',
                    'Only to find',
                    'It darker each day',
                    'Till you can’t even see',
                    'What is long gone away',
                    '\n',
                    'But I saw the angel in you',
                    'And it was all understood',
                    'All that I knew',
                    'When you were singing',
                    'That song about your father',
                    'The one called “Red River Blue”',
                    'I saw the angel in you',
                    'While you were laughing',
                    'In the key of glee',
                    'Out where the minstrels',
                    'Take their tea',
                    'When you were wandering faithfully',
                    'When you were holding',
                    'Your life out to me',
                    'I saw the angel in you',
                    'In the face of the looking glass moon',
                    '\n',
                    'I still look for you',
                    'In the drift of the day',
                    'Still seek your grace',
                    'Any old way',
                    '\n',
                    'And when the nighttime steals down',
                    'Out of the blue',
                    'Like the storm that tore',
                    'The sky in two',
                    'And I am still tender',
                    'About the wound',
                    'In the face of the looking glass moon'], false, false, callback);
            },
            function(callback) {
                songCreate('ROLLING BY', 'Present', '2013', ['Charles John Quarto'], 'Song', false, 'This is the morning I\'ll sing',  false, false, false, false, [
                    'Out where the wind tells the stories',
                    'They are not lost upon the land',
                    'The blue coyote wanders',
                    'Within the perfect plan',
                    'The ghost of Geronimo',
                    'Gathers up the long ago',
                    'And sings it through our hands',
                    '\n',
                    'I shall build me a cabin',
                    'Out of hope and stone',
                    'It shall turn to a chapel when I’m gone',
                    'Shepherd unto sky',
                    'That wasn’t the wagons that awoke you',
                    'That was just the ages rolling by',
                    '\n',
                    'Fare the well',
                    'My Denver friends',
                    'This world’s made out of circles',
                    'And we shall meet again',
                    '\n',
                    'Be easy on your horses',
                    'Remember what leads you',
                    'Will surely follow',
                    'In the full measure of the moon',
                    'So count upon your laughter',
                    'When you need some good advice',
                    'Follow every mermaid through the ice',
                    '\n',
                    'Did you ever lie down',
                    'In the cradle of a canyon',
                    'And somehow know',
                    'You will never be abandoned',
                    '\n',
                    'Rolling by',
                    'Like time down a mountain',
                    'Like night come to town',
                    'In a blur of an eye',
                    'That wasn’t the wagons that awoke you',
                    'That was just the ages rolling by'], false, false, callback);
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