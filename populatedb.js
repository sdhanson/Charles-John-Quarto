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
    // has a default
    if (link !== false) {
        albumdetail.link = link;
    }
    // has a default
    if (spotify !== false) {
        albumdetail.spotify = spotify;
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

function collectionCreate(title, decade, author, poems, image, link, category, visible, type, cb) {
    collectiondetail = {
        title: title,
        decade: decade,
        poems: poems,
        type: type,
    };
    // if (year !== false) {
    //     collectiondetail.image = year;
    // } else {
    //     collectiondetail.image = null;
    // }
    if (author !== false) {
        collectiondetail.author = author;
    }
    if (link !== false) {
        collectiondetail.link = link;
    } else {
        collectiondetail.link = null;
    }
    if (visible !== false) {
        collectiondetail.visible = visible;
    } else {
        collectiondetail.visible = null;
    }

    var collection = new Collection(collectiondetail);

    collection.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New Collection: ' + collection);
        collections.push(collection);
        cb(null, collection)
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
                songCreate('THE WIND BECOMES COYOTE', 'Present', '2013', ['Charles John Quarto'], 'Song', false, 'Echoes blue Oklahoma',  false, false, false, false, ['The wind becomes coyote',
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
                songCreate('THE LILAC IN YOU', 'Present', '2013', ['Charles John Quarto'], 'Song', false, 'THE LILAC IN YOU',  false, false, false, false, [
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
                songCreate('I AM BLUE WOLF', 'Present', '2013', ['Charles John Quarto'], 'Song', false, 'I am Blue Wolf',  false, false, false, false, [
                    'I am Blue Wolf',
                    'Of the winter tribe',
                    'I am Cheyenne',
                    'Deep down inside',
                    'I sing with the wind',
                    'By opening my eyes',
                    '\n',
                    'Here in Wisdom’s innocence',
                    'Where the tumbleweed comes to rest',
                    'I come to ride',
                    '\n',
                    'Out across the prairie',
                    'Where the great ghosts go',
                    'Through Antelope Valley',
                    'To greet the Arapahoe',
                    '\n',
                    'My mother is a medicine woman',
                    'An amethyst in each eye',
                    'A bird so human you could fly',
                    '\n',
                    'I am Blue Wolf',
                    'Human Indian',
                    'I am Cheyenne',
                    'Beyond my skin',
                    'I am made out of sky',
                    'I sing with the wind',
                    'By opening your eyes',
                    '\n',
                    'Here in Wisdom’s innocence',
                    'Where the tumbleweed comes to rest',
                    'The dreamer comes to ride'], false, false, callback);
            },
            function(callback) {
                songCreate('IN THE FACE OF THE LOOKING GLASS MOON', 'Present', '2013', ['Charles John Quarto'], 'Song', false, 'Love with you',  false, false, false, false, [
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
                songCreate('ROLLING BY', 'Present', '2013', ['Charles John Quarto'], 'Song', false, 'Out where the wind tells the stories',  false, false, false, false, [
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
            function(callback) {
                poemCreate('WEIGHTLIFTERS', 'Charles John Quarto', false, 'Present', '2013', 'Poem', [
                    'Ellen and I on Twenty Five A',
                    'Slow down our car mutually',
                    'There is something in the road',
                    'That will not move',
                    'The car halts',
                    'Shy of a dead collie',
                    '\n',
                    'We get out',
                    'And step into a sad ballet',
                    'Ellen almost stoops',
                    'She stops and weeps',
                    'Her tears don’t fall, they rise',
                    'I cannot lift the dog at all',
                    'I can barely lift my eyes . . .'],  false,  false, 'Ellen and I on Twenty Five A', callback);
            },
            function(callback) {
                poemCreate('TOWNES', 'Charles John Quarto', false, 'Present', '2013', 'Poem', [
                    'He was a distant troubadour',
                    'When he was singing at my door',
                    'So I gave him all my money',
                    'That’s what the money’s for',
                    '\n',
                    'He was an owl of a man',
                    'He had the wisdom in his hand',
                    'He had the sunset in his eyes',
                    'He had the midnight in his sight',
                    '\n',
                    'He’d show up like a ghost',
                    'Deep in New Mexico',
                    'His songs were angel birds',
                    'That always saw you home',
                    '\n',
                    'He was a distant troubadour',
                    'A shadow of the truth',
                    'Sometimes he’d wander off',
                    'Without leaving the room',
                    '\n',
                    'He had a touch of the tumbleweed',
                    'In his throat',
                    'He didn’t say that much',
                    'Except in what he wrote',
                    '\n',
                    'And there lies the beauty',
                    'That he left in this world',
                    'Like an Indian blanket',
                    'Around a runaway girl . . .'],  false,  false, 'He was a distant troubadour', callback);
            },
            function(callback) {
                poemCreate('METEORS', 'Charles John Quarto', false, 'Present', '2013', 'Poem', [
                    'Bathing in the meteor shower',
                    'Oceans open to the light',
                    'Earth receives her baptism',
                    'Tonight',
                    '\n',
                    'And just then when you touched me',
                    'It was like an angel landing on a lily pad',
                    'With all your gentle might',
                    'The kiss of sight',
                    '\n',
                    'Let the love songs rockabye the blues',
                    'Let the breezes turn the Bible pages',
                    'Back through the beginning',
                    'Before the old and new',
                    'When the murmur became a choir',
                    'Unremoved',
                    '\n',
                    'And when the stars first dreamed themselves',
                    'A sky',
                    'To send wishes back to the world',
                    'In the form of meteors',
                    'I was already yours'],  false,  false, 'Bathing in the meteor shower', callback);
            },
            function(callback) {
                poemCreate('KING PRIDE 1956', 'Charles John Quarto', false, 'Present', '2013', 'Poem', [
                    'June’s mask’s a comfort',
                    'And school is losing hold',
                    'Grandma has squired her rocker',
                    'Nearby the kitchen stove',
                    'Where it’s muffins as ever',
                    'Kingpride, her cat,',
                    'The world champion mousetrap',
                    'Is smiling like a hunter',
                    'In Grandma’s sweet clutch',
                    '\n',
                    'Grandpa was on the roof',
                    'This morning, getting',
                    'Ready for Heaven',
                    'He was really reading',
                    'The Bible awfully loud',
                    'He rattled swarms of crows',
                    'And I love the way he’s proud',
                    '\n',
                    'I burst with the Field',
                    'And Stream magazine',
                    'Out on the porch',
                    'Inventing what I’ll be',
                    'Yesterday, I saw a peacock',
                    'Who may have recognized me . . .'],  false,  false, 'June’s mask’s a comfort', callback);
            },
            function(callback) {
                poemCreate('ALMOST', 'Charles John Quarto', false, '1980', '1982', 'Poem', [
                    'My father lay in his hammock',
                    'Like a snake in sneakers',
                    'His brothers arrived like junk mail',
                    'My sister shrank in her doll house',
                    'In a snowy fairy tale while',
                    'I ran the country of my room',
                    'Like some kid ghost',
                    '\n',
                    'My cousin wore thin socks',
                    'And failed to salute my dog',
                    'Even though it was a holiday',
                    'Mother was swimming in the cooking sherry',
                    'Floating through household chores',
                    'In hazy charge of the cheeseburgers',
                    '\n',
                    'At the maple shaded picnic table',
                    'Smiling diver flies struck',
                    'At the cow’s eyes of the ketchup spills',
                    'And my father made a fist',
                    'Out of his face',
                    'His brothers swallowed',
                    'A bottle’s worth of olives',
                    'As the radio played Patti Page',
                    'And Perry Como',
                    'Until my cousin’s socks collapsed',
                    '\n',
                    'That night',
                    'My father had a new explosion',
                    'When I went to the softball game',
                    'With Elihu Robinson',
                    'And came home way after the rules',
                    'Right away he crushed my fun',
                    'But when I asked him',
                    'How come the moon was allowed',
                    'To stay out so late',
                    'He almost called me son . . . .'],  false,  false, 'My father lay in his hammock', callback);
            },
            function(callback) {
                poemCreate('BLUE MORNING STARS', 'Charles John Quarto', false, 'Present', '2013', 'Poem', [
                    'Remember the drift of the days',
                    'By the river',
                    'When we swore we’d be each other’s',
                    'Blue morning stars',
                    'Angels over Mexico',
                    'Angels in our hearts',
                    '\n',
                    'Rodeo riders',
                    'And feathers on wires',
                    'Things that hold on tight',
                    'Darling I feel that way tonight',
                    '\n',
                    'And I’m long past the language',
                    'Of saying nothing',
                    'And I find you unhidden in all my songs',
                    'I will meet you in the pull of the moon',
                    'On the midnight',
                    'When the gypsies face their wings',
                    'We’ll make every scarecrow sing',
                    '\n',
                    'Just remember the drift of the days',
                    'By the river',
                    'When we swore we’d be each other’s',
                    'Blue morning stars',
                    'I know that’s who we are'],  false,  false, 'Remember the drift of the days', callback);
            },
            function(callback) {
                poemCreate('OLE POPS\' MAGIC JAR', 'Charles John Quarto', false, 'Present', '2013', 'Poem', [
                    'Ole Pops, he had a magic jar',
                    'He told me to never look in there',
                    'It was from somewhere way back in the Bible',
                    'Some little country with a lot of syllables',
                    'He kept it way up on a shelf',
                    'Buried in the years',
                    'Once I saw him close his eyes',
                    'And hold it to his ear',
                    'Like it was made of Jupiter',
                    '\n',
                    'Sometimes we’d hear him in his room',
                    'Alchemizing the moon',
                    'Instructions for something',
                    'We do not presume',
                    'Other times it sounded like',
                    'He was juggling clocks',
                    'Like he was making a mountain',
                    'Out of a music box',
                    '\n',
                    'The sides were painted pyramids',
                    'Irises and irids',
                    'A lion and a lynx',
                    'A river made of light',
                    'And a raven made of Sphinx',
                    'Missing symbols in a strand',
                    'Eight faces in a tree',
                    'Nine fingers on a hand',
                    'Extending eternity',
                    'So one night I dreamed it',
                    'Dreaming of me',
                    'Reaching up to touch the lid',
                    'I felt like human amethyst',
                    '\n',
                    'The day he died',
                    'I grew new eyes and made the climb',
                    'And opened it up as it did me',
                    'Then looking down into the black',
                    'I saw ole Pops and his seven sisters',
                    'Saintly waving back',
                    '\n',
                    'Old Pops, he had a magic jar',
                    'Sometimes he’d ease the top off',
                    'Releasing a new star . . . . .'],  false,  false, 'Ole Pops, he had a magic jar', callback);
            },
            function(callback) {
                poemCreate('THE GREENLAWN WATER TOWER', 'Charles John Quarto', false, 'Present', '2013', 'Poem', [
                    'Almost as rude as war',
                    'She stood there helicopter high',
                    'Like a bully blessed with radar',
                    'I remember shrinking under',
                    'Her metal daredevil belly',
                    'Staring up her ladder legs',
                    'With twenty twenty envy',
                    'And zero Mohawk blood',
                    '\n',
                    'Yea, the mystery of altitude',
                    'Thrusts tower’s shadows on cowards',
                    'But certain friends',
                    'Who brought brave sneakers',
                    'Immunized with Rhinegold',
                    'Came lugging buckets of Dutch Boy',
                    'And climbed the scares',
                    'Up to her dreamy mezzanine',
                    'To splash the class numerals',
                    'In God’s blue eyes',
                    'With all the privileges of Hillary',
                    'I can still hear their',
                    'Heroes’ echoes laughing in the sky',
                    '\n',
                    'And I recall my neck grew mad',
                    'Foster child of wonder',
                    'At the Greenlawn Water Tower',
                    'For maintaining a tall',
                    'Hold on her secrets',
                    'So, two nights later',
                    'I chucked a beer can at her',
                    'But it was like trying',
                    'To hit the government with',
                    'A snowball . . .'],  false,  false, 'Almost as rude as war', callback);
            },
            function(callback) {
                poemCreate('AT LOVE\'S BRIGHT CAMPAIGN', 'Charles John Quarto', false, '1980', '1982', 'Poem', [
                    'Often have I marveled at love’s bright campaign',
                    'I’ve been staggered by its grandeur in the rain',
                    'I’ve counted all the pretty ribbons',
                    'Strewn down many country lanes',
                    'Reasoned out the milkman’s whistle',
                    'And the mailman’s promenade',
                    'And seen smiles that no science could explain',
                    '\n',
                    'Often have I marveled at love’s bright campaign',
                    'I’ve witnessed giants armed with flowers in parades',
                    'I’ve heard a hobo gain direction',
                    'Murmuring a woman’s name',
                    'Watched him wander out of trouble',
                    'Concentrating on the train',
                    'That would take him to some home so far away',
                    '\n',
                    'Often have I marveled at love’s bright campaign',
                    'I’ve swallowed hermit’s tears along with my champagne',
                    'I’ve toasted every soldier’s romance',
                    'Be it provident or plain',
                    'Lit a loving little candle',
                    'As if summary remains',
                    'I’ve found the heart to be much wiser than the brain'],  false,  false, 'Often have I marveled at love’s bright campaign', callback);
            },
            function(callback) {
                poemCreate('WHEN MY SISTER FELL OUT OF THE MAPLE TREE', 'Charles John Quarto', false, 'Present', '2013', 'Poem', [
                    'When my sister fell out of the maple tree',
                    'She broke her arm and dignity',
                    'My mother screamed perhaps at God',
                    'As neighbors streamed into the yard',
                    '\n',
                    'Alan Probeck shook his head',
                    'Even Mrs. Smith got out of her pool',
                    'So we knew it was a big to do',
                    'Even Mr. Tilden',
                    'Stopped yelling at his children',
                    'For a minute or two',
                    '\n',
                    'When my sister fell out of the maple tree',
                    'My doggie wagged his tail at me',
                    'As if perhaps to celebrate',
                    'So I brought out twenty puppy cakes',
                    '\n',
                    'My mother drove her to the doctor',
                    'For further punishment',
                    'As Mrs. Smith returned to her tan',
                    'And Alan Probeck made his exit',
                    '\n',
                    'When my sister fell out of the maple tree',
                    'She didn’t make a sound',
                    'But she still stuck her tongue out at me',
                    'Before she hit the ground . . .'],  false,  false, 'When my sister fell out of the maple tree', callback);
            },
            function(callback) {
                poemCreate('LIGHT BRINGS FIRE', 'Charles John Quarto', false, 'Present', '2013', 'Poem', [
                    'Light brings fire',
                    'Fire light',
                    'Shelter cave',
                    'And shadow kite',
                    '\n',
                    'Light draws nearer',
                    'Day or night',
                    'Light brings fire',
                    'Fire light',
                    '\n',
                    'Sun my signal',
                    'Star my guide',
                    'Light brings fire',
                    'Deep inside',
                    '\n',
                    'Moon my mirror',
                    'Wind my comb',
                    'Light my bearer',
                    'Leads me home',
                    '\n',
                    'Light brings fire',
                    'Fire light',
                    'Darkness closeness',
                    'But to what',
                    '\n',
                    'Light draws clearer',
                    'Night or day',
                    'And it blesses blindly',
                    'What’s in the way',
                    '\n',
                    'Sees what’s real',
                    'Knows what’s right',
                    'Light brings fire',
                    'Fire light'],  false,  false, 'Light brings fire', callback);
            },
            function(callback) {
                poemCreate('THE GARDEN IN THE ROSE', 'Charles John Quarto', false, 'Present', '2013', 'Poem', [
                    'Now that you have heard the sea in a shell',
                    'Open your heart to the sky',
                    'Let the wind bring you everything',
                    'If not your world',
                    'Well then your wing',
                    'It is there you shall come to understand',
                    'What the child’s forever telling the man',
                    'It is here that you will remember',
                    'What every angel knows',
                    'Love looks for you through your own eyes',
                    'Whenever they open or close',
                    'Learn to see the garden in the rose'],  false,  false, 'Now that you have heard the sea in a shell', callback);
            },
            function(callback) {
                poemCreate('LOOK DEEP INTO THE EYES OF DOGS', 'Charles John Quarto', false, '1980', '1982', 'Poem', [
                    'Look deep into the eyes of dogs',
                    'They know the true master',
                    'Is contained within',
                    'So they put up with the leash',
                    'And give you permission to convince yourself',
                    'That you are right',
                    'To tell them when to eat',
                    'And where to sit',
                    'And at whose feet',
                    '\n',
                    'Look deep into the eyes of dogs',
                    'They are not ashamed to be perfect',
                    'Even in the cage of your address',
                    'They consider your statement',
                    'And energize their faith',
                    'Coming over to you',
                    'And always responding with grace',
                    'As if saying:',
                    '“You know, I love you silly folks',
                    'But honestly',
                    'My eyes show more than my tail does',
                    'And as soon as you figure that out',
                    'I’ll teach you some other tricks” . . . .'],  false,  false, 'Look deep into the eyes of dogs', callback);
            },
            function(callback) {
                poemCreate('STRAWBERRIES', 'Charles John Quarto', false, '1980', '1982', 'Poem', [
                    'When Freddie Ditmar',
                    'And I got caught stealing strawberries',
                    'Redhanded from the Tilden farm',
                    'We had nearly filled our milk pails',
                    'When Old Man Tilden crossed the field',
                    'And drew a buckshot bead on us',
                    'With the family gun',
                    'Our hands went up like spring corn',
                    'As he asked what in the tarnation',
                    'We were doing, but he knew . . .',
                    'So he marched us to his farmhouse',
                    'Called a cop who made us promise',
                    'That we believed in God and Heaven',
                    'Which was true',
                    'Trouble was we believed in strawberries',
                    'Still do . . .'],  false,  false, 'When Freddie Ditmar', callback);
            },
        ],
        // optional callback
        cb);
}

// title, decade, author, poems, image, display, link, category, visible cb
function createCollections(cb) {
    async.parallel([
            function(callback) {
                collectionCreate('THE GARDEN IN THE ROSE', 'Present', 'Charles John Quarto', ['BIG RIVER',
                    'THE GARDEN IN THE ROSE',
                    'THE GIFT',
                    'MINSTRELS ON THE INTERSTATE',
                    'MY NEIGHBOR\'S BLUE RADIO',
                    'THE LITTLE FLOWERS ON THE HILL',
                    'THE NEW FALL LIGHT',
                    'MUSIC\'S A GYPSY',
                    'THE SOLDIERS',
                    'THE METROPOLITAN ELF',
                    'THE HEALING',
                    'LOVE\'S BLUE ABANDON',
                    'LOVE WANDERS NEARBY',
                    'LOOK DEEP INTO THE EYES OF DOGS',
                    'THE THING ABOUT 1965',
                    'THE OLDTIMERS KNOW',
                    'THE TEENAGE GIRL\'S FATHER',
                    'THE RAIN COMES DOWN IN POEMS',
                    'ROSES',
                    'POET',
                    'THE DARK AND THE DIVINE',
                    'FEATHER LEAVES OF THE FIGBIRD TREE',
                    'MISSED CALLING',
                    'MELODIES',
                    'THE GHOST OF YOUR EYES',
                    'MY BLUE CRAYON',
                    'OLD NASHVILLE RAIN',
                    'ADIOS',
                    'STRAWBERRIES',
                    'A PRAYER FOR A CLOSE FRIEND\'S DAUGHTER'], false, false, false, [poems[12], poems[13], poems[14]], 'Poetry', callback);
            },
            function(callback) {
                collectionCreate('ALMOST', 'Present', 'Charles John Quarto', ['METEORS',
                    'TAKING A WALK',
                    'DOLPHIN IN A GOLDFISH BOWL',
                    'TO KERRVILLE',
                    'I HAVE STOOD IN THEIR DARK FRONT YARDS',
                    'HIS HEART WAS SO FULL OF MISCHIEF',
                    'WILDFLOWERS TO ME',
                    'ESTRELLA, THE NIGHT (IN PROGRESS)',
                    'EASILY LOST IN THE OCEAN',
                    'TIMES NOW',
                    'YOUR POEM',
                    'THE CHILD BEATER',
                    'GOD',
                    'GULP',
                    'THE RAIN COMES DOWN IN POEMS',
                    'THAT BUZZING ON THE MOUNTAIN: THOSE STONES',
                    'THE OLD FIDDLER',
                    'THE CHARMING POETS OF COEUR D\'ALENE',
                    'I\'D LIKE THE WORLD TO CALL ME GRANDPAPA',
                    'I LIKE THE WAY YOUR DAUGHTER SINGS',
                    'HONDO\'S GHOST',
                    'I HEAR THE GYPSY WHISTLING',
                    'BEGIN AS A FLOWER',
                    'FROM A BOY INTO A COWBOY',
                    'THE GREENLAWN WATER TOWER',
                    'A WOMAN IN THE SHIELDED SPRING',
                    'KINGPRIDE 1956',
                    'A POEM TO GOD ABOUT THE WARS',
                    'HARMONICA',
                    'ALMOST'], false, false, false, [poems[3], poems[4], poems[5]], 'Poetry', callback);
            },
            function(callback) {
                collectionCreate('BLUE MORNING STARS', 'Present', 'Charles John Quarto', ['BLUE MORNING STARS',
                    'ELVES',
                    'WRISTWATCHES',
                    'CHRISTMAS IN THE EVERGLADES',
                    'MUSIC CALLING',
                    'MY FRIEND THE FOLKSINGER',
                    'MOTHER I SHALL SALUTE YOU',
                    'WORK',
                    'FIRST AND LAST PIANO LESSON',
                    'LETTER TO HOLLYWOOD',
                    'OLE POPS\' MAGIC JAR',
                    'LONG BEFORE WE WERE LITTLE, WE WERE LOVE',
                    'STORYTELLER',
                    'SQUASHED BEATLE',
                    'YOU SAY YOU ARE IN THE MILITARY',
                    'PUT YOURSELF THERE',
                    'PURITY',
                    'POETS WATCH NORTH MAINE COAST',
                    'THE WIND FEELS YOU',
                    'NOTICE',
                    'THAT SONG ABOUT GERONIMO',
                    'THAT CHINESE BOW',
                    'OUT ON LAKE ERIE',
                    'WALTZ OF THE WILLOWS',
                    'BOB DYLAN',
                    'CONTEMPLATING BOXING EDDIE BIVONA',
                    'THE SIMPLE ROADS OF MY HOMETOWN',
                    'ROCKING CHAIRS',
                    'TRACE OF MINGUS',
                    'THE GREENLAWN WATER TOWER'], false, false, false, [poems[6], poems[7], poems[8]], 'Poetry', callback);
            },
            function(callback) {
                collectionCreate('WEIGHTLIFTERS', 'Present', 'Charles John Quarto', ['THE MUSIC DURING WAR',
                    'YOU DON\'T BELIEVE IN GHOSTS',
                    'MALIBU LOVE',
                    'THE FAMILY PLOT',
                    'BIRD POET',
                    'ROCKING CHAIR',
                    'NOTE TO MY FUTURE DAUGHTER',
                    'THE NIGHT TIME',
                    'THE THING ABOUT 1965',
                    'THE MIRACLE',
                    'SONNET',
                    'SOMETHING GREEN',
                    'SECRETS I CANNOT KEEP',
                    'SEBASTIAN\'S SONG',
                    'SAILING',
                    'RENOIR WOULD HAVE PAINTED THIS',
                    'REAL JAZZWEATHER',
                    'RAVENSONG',
                    'BEYOND CARTOON REPAIR',
                    'TRANSLATING TRAINWHISTLES',
                    'ANY MOMENT ON A MOUNTAINTOP',
                    'TOWNES',
                    'THOUGHTS ON A GLOBE',
                    'HOBOES',
                    'WASHING HANDS OF THE WAR',
                    'WEIGHTLIFTERS',
                    'HONDO',
                    'HURRY',
                    'HOBO LOVE',
                    'THE GREATEST'], false, false, false, [poems[0], poems[1], poems[2]], 'Poetry', callback);
            },
            function(callback) {
                collectionCreate('WHEN MY SISTER FELL OUT OF THE MAPLE TREE', 'Present', 'Charles John Quarto', ['TAKING UP THE FIDDLE',
                    'AT LOVE\'S BRIGHT CAMPAIGN',
                    'THE STAR OF LOVE',
                    'THE CHILD IS LOST',
                    'THE BRIGHTEST',
                    'WHEN MY SISTER FELL OUT OF THE MAPLE TREE',
                    'THE BROKEN WEB OF PITY LUST',
                    'THE BUTTERFLY',
                    'CARS AND TRUCKS FOREVER!',
                    'NIGHT IS',
                    'THE ATTIC MASTER',
                    'MY SIGNAL WAS EARLY',
                    'IF THE MUSIC',
                    'IN MRS. KAISER\'S SEVENTH GRADE MATH CLASS',
                    'THE NIGHT TIME',
                    'HAWK',
                    'WITH OLD COWBOYS',
                    'WIND HELPING THE ROBINS',
                    'GHOST OF MY GUITAR',
                    'DEBUT OF A ROSE',
                    'DARE OF AN ANGEL',
                    'CHILDREN DANCING IN A RING',
                    'OBSERVATIONS FROM CENTERPORT HILL',
                    'CHURCHBELLS',
                    'THINKING ABOUT GOD WHILE ON HOLD',
                    'THE WAY THE OLD MEN WATCH THE TRAINS',
                    'THE WHISTLE',
                    'LIGHT BRINGS FIRE',
                    'ONLY A TRAIN',
                    '1965'], false, false, false, [poems[9], poems[10], poems[11]], 'Poetry', callback);
            },
            function(callback) {
                collectionCreate('MERCY BEAUCOUP', 'Present', 'Charles John Quarto', ['IN THE FACE OF THE LOOKING GLASS MOON',
                    'MERCY BEAUCOUP',
                    'THE WHISPER IN THE WIND',
                    'I STILL LOOK AT ME HEART THAT WAY',
                    'GLAD',
                    'FREIGHT TRAIN COMING',
                    'MARIANNA',
                    'EVERYTHING TURNS INTO YOU',
                    'DRIFTWOOD',
                    'MR. MOON',
                    'ROLLING BY',
                    'THE WIND\'S THE ONLY WOMAN',
                    'SHE TIPPED HER WINGS',
                    'SHE\'S GOING SOMEWHERE',
                    'LARIAT',
                    'SOMETHING IN THE WEST TEXAS WINDS',
                    'OF MANDOLINS AND SAMUEL CLEMENS',
                    'THE ROAD TO THE RAINBOW',
                    'CHRIST THROUGH THE CLOUDS',
                    'BLUES ANGEL OF DIXIELAND',
                    'THAT OLD FREIGHT TRAIN ME',
                    'I LOVE YOU FROM THE LONG AGO',
                    'I\'M FOLLOWING MY STAR INTO YOUR EYES',
                    'ROMEO',
                    'OH NEW ORLEANS',
                    'OUT IN THE RICOCHET RAIN',
                    'RAINDANCER',
                    'MISSISSIPPI ROLLING THROUGH MY MIND',
                    'TURN AND STARE',
                    'MIDNIGHT ON THE BAYOU'], false, false, false, [songs[4], songs[5]], 'Songs', callback);
            },
            function(callback) {
                collectionCreate('CORNER OF THE CIRCLE', 'Present', 'Charles John Quarto', ['THAT WANDERING INDIAN',
                    'ALWAYS SOMETHING STIRRING IN THE SOUTH',
                    'THE RULES',
                    'BABY\'S MOVING AT THE SPEED OF BLUE',
                    'COMBING THE WOODS WITH THE WIND',
                    'CHEROKEE MANDOLIN',
                    'BLUE OUTSKIRTS OF TUPELO',
                    'WHEN SHE WHISPERS TO ME',
                    'SONGS COME IN STORMS',
                    'THE WIND KEEPS ITS WORD',
                    'ONCE YOU WISH UPON A STAR',
                    'THE WEST WAS NEVER SETTLED',
                    'MEMORIES MAY BE CLOSER THAN THEY APPEAR',
                    'SHE WEARS THE CLOUDS FOR FEATHERS',
                    'THE WILD BLUE YONDER IN HER EYES',
                    'GYPSY JOE',
                    'THE WIND BECOMES COYOTE',
                    'SKYWRITER IN WINTER',
                    'WHEN I FELL IN LOVE WITH YOU',
                    'THE OLD LOST CANYON LULLABY',
                    'IT AIN\'T THE BLUES',
                    'IN MY OWN SECRET SKY',
                    'THE GYPSIES AREN\'T PUZZLED BY THAT',
                    'JUST FINE',
                    'I WALK ALONG THE TRACKS',
                    'I WISH YOU MANY RAVENS ON YOUR ROAD',
                    'IF I WAS A RIVER',
                    'MY OWN SECRET STAR',
                    'THE ARROWHEAD\'S MY HIGHWAY SIGN (SONG OF APACHE LAKE)',
                    'NOW THAT THE GYPSIES ARE GONE'], false, false, false, [songs[0], songs[1]], 'Songs', callback);
            },
            function(callback) {
                collectionCreate('CHARLES JOHN QUARTO', 'Present', 'Charles John Quarto', ['COBWEBS IN TEXAS',
                    'HOPI LOVE',
                    'I JUST KNOW',
                    'FIDDLE MAY CARE',
                    'SOMEWHERE AWAY',
                    'IT WAS THE JAZZ',
                    'JULIE\'S SONG',
                    'I AM BLUE WOLF',
                    'KING OF THE HILL',
                    'LATE NIGHT EARLY MORNING BLUES',
                    'SEAGULL ON SANDCASTLE',
                    'RAINFALL MADE OF MERCY',
                    'AUTUMN SONG',
                    'BELLS IN MY HEART',
                    'ECHO ON THEIR OWN',
                    'THE HEART IS WILD',
                    'OLD RIVERS GET ALONG JUST FINE',
                    'TIME TO GO SEE INDIAN JOE',
                    'THE RAILROADS\' GOT A ONE TRACK MIND',
                    'IT AIN\'T THE BLUES',
                    'CHEROKEE CIRCLE OF STONES',
                    'SARA, GREEN RIBBONS AND SONGS',
                    'FROM DALLAS TO DENVER',
                    'MAYBE I\'M A RAINBOW',
                    'SHE LEAVES ME STANDING IN THE AIR',
                    'SHE\'S ONE OTHER THING -- SHE\'S MINE',
                    'CHRISTMAS SONG',
                    'THE LILAC IN YOU',
                    'THE ONE-EYED PIRATE',
                    'THROUGH MISSISSIPPI'], false, false, false, [songs[2], songs[3]], 'Songs', callback);
            },
        ],
        // optional callback
        cb);
}

async.series([
        createPhotos,
        createAlbums,
        createSongs,
        createPoems,
    createCollections,
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