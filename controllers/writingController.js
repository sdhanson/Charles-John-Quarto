var Book = require('../models/book');
var Poem = require('../models/poem')
var Song = require('../models/song')

var async = require('async');

exports.index = function(req, res, next) {
    var perPage = 2;
    var page = req.params.page || 1;

    async.parallel({
        book_list: function(callback){
            Book.find({})
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec(callback)
        },
        poem_list: function(callback) {
            Poem.find({})
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec(callback)
        },
        song_list: function(callback) {
            Song.find({lyrics: { $ne: false }})
                .skip((perPage * page) - perPage)
                .limit(perPage)
            .exec(callback)
        },
        book_count: function(callback) {
            Book.find({}).count().exec(callback)
        },
        poem_count: function(callback) {
            Poem.find({}).count().exec(callback)
        },
        song_count: function(callback) {
            Song.find({lyrics: { $ne: false }}).count().exec(callback)
        }
    }, function(err, results){
        if(err){
            return next(err);
        }
        var sub = false;
        var titlesub = '';
        var title = 'Written Works';
        var subtitle = 'Poetry, Lyrics, and Collections. ';
        var link = 'Shop Now.';
        var image = '/images/water.jpg';
        var count = results.book_count + results.poem_count + results.song_count;
        res.render('written-works', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image,
            titlesub: titlesub,
            sub: sub,
            current: page,
            pages: Math.ceil(count/(perPage*3)),
        });
    });
};

exports.poems = function(req, res, next) {
    var perPage = 5;
    var page = req.params.page || 1;

    async.parallel({
        book_list: function(callback){
            Book.find({category: 'Null'})
                .exec(callback)
        },
        poem_list: function(callback){
            Poem.find({})
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec(callback)
        },
        song_list: function(callback) {
            Song.find({category: 'Null'})
                .exec(callback)
        },
        poem_count: function(callback) {
            Poem.find({}).count().exec(callback)
        },
    }, function(err, results){
        if(err){
            return next(err);
        }
        var sub = false;
        var titlesub = '';
        var title = 'Written Works';
        var subtitle = 'Poetry. ';
        var link = 'Shop Now.';
        var image = '/images/water.jpg';
        var count = results.poem_count;
        res.render('written-works', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image,
            titlesub: titlesub,
            sub: sub,
            current: page,
            pages: Math.ceil(count/perPage),
        });

    });
};


// DONT THINK LYRICS TRUE WORKS
exports.songs = function(req, res, next) {
    var perPage = 5;
    var page = req.params.page || 1;

    async.parallel({
        book_list: function(callback){
            Book.find({category: 'Null'})
                .exec(callback)
        },
        poem_list: function(callback){
            Poem.find({category: 'Null'})
                .exec(callback)
        },
        song_list: function(callback){
            Song.find({lyrics: { $ne: false }})
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec(callback)
        },
        song_count: function(callback) {
            Song.find({lyrics: { $ne: false }}).count().exec(callback)
        }
    }, function(err, results){
        if(err){
            return next(err);
        }
        var sub = false;
        var titlesub = '';
        var title = 'Written Works';
        var subtitle = 'Lyrics. ';
        var link = 'Shop Now.';
        var image = '/images/water.jpg';
        var count = results.song_count;
        res.render('written-works', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image,
            sub: sub,
            titlesub: titlesub,
            current: page,
            pages: Math.ceil(count/perPage),
        });

    });
};

exports.collections = function(req, res, next) {
    var perPage = 5;
    var page = req.params.page || 1;

    async.parallel({
        book_list: function(callback){
            Book.find({})
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec(callback)
        },
        poem_list: function(callback){
            Poem.find({category: 'Null'})
                .exec(callback)
        },
        song_list: function(callback){
            Song.find({category: 'Null'})
                .exec(callback)
        },
        book_count: function(callback) {
            Book.find({}).count().exec(callback)
        },
    }, function(err, results){
        if(err){
            return next(err);
        }
        var sub = false;
        var titlesub = '';
        var title = 'Written Works';
        var subtitle = 'Collections. ';
        var link = 'Shop Now.';
        var image = '/images/water.jpg';
        var count = results.book_count;
        res.render('written-works', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image,
            titlesub: titlesub,
            sub: sub,
            current: page,
            pages: Math.ceil(count/perPage),
        });

    });
};

exports.song_collections = function(req, res, next) {
    var perPage = 5;
    var page = req.params.page || 1;

    async.parallel({
        book_list: function(callback){
            Book.find({type: 'Songs'})
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec(callback)
        },
        poem_list: function(callback){
            Poem.find({category: 'Null'})
                .exec(callback)
        },
        song_list: function(callback){
            Song.find({category: 'Null'})
                .exec(callback)
        },
        book_count: function(callback) {
            Book.find({type: 'Songs'}).count().exec(callback)
        },
    }, function(err, results){
        if(err){
            return next(err);
        }
        var sub = false;
        var titlesub = '';
        var title = 'Written Works';
        var subtitle = 'Song Collections. ';
        var link = 'Shop Now.';
        var image = '/images/water.jpg';
        var count = results.book_count;
        res.render('written-works', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image,
            titlesub: titlesub,
            sub: sub,
            current: page,
            pages: Math.ceil(count/perPage),
        });

    });
};

exports.poetry_collections = function(req, res, next) {
    var perPage = 5;
    var page = req.params.page || 1;

    async.parallel({
        book_list: function(callback){
            Book.find({type: 'Poetry'})
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec(callback)
        },
        poem_list: function(callback){
            Poem.find({category: 'Null'})
                .exec(callback)
        },
        song_list: function(callback){
            Song.find({category: 'Null'})
                .exec(callback)
        },
        book_count: function(callback) {
            Book.find({type: 'Poetry'}).count().exec(callback)
        },
    }, function(err, results){
        if(err){
            return next(err);
        }
        var sub = false;
        var titlesub = '';
        var title = 'Written Works';
        var subtitle = 'Poetry Collections. ';
        var link = 'Shop Now.';
        var image = '/images/water.jpg';
        var count = results.book_count;
        res.render('written-works', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image,
            titlesub: titlesub,
            sub: sub,
            current: page,
            pages: Math.ceil(count/perPage),
        });

    });
};

exports.decade = function(req, res, next) {
    var perPage = 2;
    var page = req.params.page || 1;

    var specifier = req.params.specifier.charAt(0).toUpperCase() + req.params.specifier.slice(1);
    var year;
    if(req.params.specifier === 'present' || req.params.specifier === 'Present' ) {
        year = 'present';
    } else {
        year = req.params.specifier + 's';
    }
    async.parallel({
        book_list: function(callback){
            Book.find({decade: specifier})
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec(callback)
        },
        poem_list: function(callback){
            Poem.find({decade: specifier})
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec(callback)
        },
        song_list: function(callback) {
            Song.find({decade: specifier, lyrics: { $ne: false }})
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec(callback)
        },
        book_count: function(callback) {
            Book.find({decade: specifier}).count().exec(callback)
        },
        poem_count: function(callback) {
            Poem.find({decade: specifier}).count().exec(callback)
        },
        song_count: function(callback) {
            Song.find({decade: specifier, lyrics: { $ne: false }}).count().exec(callback)
        },
    }, function(err, results){
        if(err){
            return next(err);
        }
        var sub = false;
        var titlesub = '';
        var title = 'Written Works';
        var subtitle = 'Written work from the ' + year + '. ';
        var link = 'Shop Now.';
        var image = '/images/water.jpg';
        var count = results.book_count + results.poem_count + results.song_count;
        res.render('written-works', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image,
            titlesub: titlesub,
            sub: sub,
            current: page,
            pages: Math.ceil(count/(perPage*3)),
        });
    });
};

exports.single_song = function(req, res, next) {
    async.parallel({
        book: function(callback){
            Book.findOne({category: 'Null'})
                .exec(callback)
        },
        poem: function(callback){
            Poem.findOne({category: 'Null'})
                .exec(callback)
        },
        song: function(callback) {
            Song.findById(req.params.id)
                .exec(callback)
        }
    }, function(err, results){
        if(err){
            return next(err);
        }
        var sub = false;
        var titlesub = '';
        var title = 'Lyrics';
        var subtitle = '';
        var link = '';
        var image = '/images/water.jpg';
        res.render('poem', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image,
            titlesub: titlesub,
            sub: sub
        });

    });
};

exports.single_poem = function(req, res, next) {
    async.parallel({
        book: function(callback){
            Book.findOne({category: 'Null'})
                .exec(callback)
        },
        poem: function(callback){
            Poem.findById(req.params.id)
                .exec(callback)
        },
        song: function(callback) {
            Song.findOne({category: 'Null'})
                .exec(callback)
        }
    }, function(err, results){
        if(err){
            return next(err);
        }
        var sub = false;
        var titlesub = '';
        var title = 'Poetry';
        var subtitle = '';
        var link = '';
        var image = '/images/water.jpg';
        res.render('poem', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image,
            titlesub: titlesub,
            sub: sub
        });

    });
};

exports.single_collection = function(req, res, next) {
    async.parallel({
        book: function(callback){
            Book.findById(req.params.id)
                .exec(callback)
        },
        poem: function(callback){
            Poem.findOne({category: 'Null'})
                .exec(callback)
        },
        song: function(callback) {
            Song.findOne({category: 'Null'})
                .exec(callback)
        }
    }, function(err, results){
        if(err){
            return next(err);
        }
        var sub = false;
        var titlesub = '';
        var title = 'Collection';
        var subtitle = '';
        var link = '';
        var image = '/images/water.jpg';
        res.render('collection', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image,
            titlesub: titlesub,
            sub: sub
        });

    });
};