var Book = require('../models/book');
var Poem = require('../models/poem')
var Song = require('../models/song')

var async = require('async');

exports.index = function(req, res, next) {
    async.parallel({
        book_list: function(callback){
            Book.find({})
                .exec(callback)
        },
        poem_list: function(callback) {
            Poem.find({})
                .exec(callback)
        },
        song_list: function(callback) {
            Song.find({lyrics: { $ne: false }})
            .exec(callback)
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
        res.render('written-works', {
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

exports.poems = function(req, res, next) {
    async.parallel({
        book_list: function(callback){
            Book.find({category: 'Null'})
                .exec(callback)
        },
        poem_list: function(callback){
            Poem.find({})
                .exec(callback)
        },
        song_list: function(callback) {
            Song.find({category: 'Null'})
                .exec(callback)
        }
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
        res.render('written-works', {
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


// DONT THINK LYRICS TRUE WORKS
exports.songs = function(req, res, next) {
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
                .exec(callback)
        },
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
        res.render('written-works', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image,
            sub: sub,
            titlesub: titlesub,
        });

    });
};

exports.collections = function(req, res, next) {
    async.parallel({
        book_list: function(callback){
            Book.find({})
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
        res.render('written-works', {
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

exports.decade = function(req, res, next) {
    var specifier = req.params.specifier.charAt(0).toUpperCase() + req.params.specifier.slice(1);
    var year;
    if(req.params.specifier === 'present') {
        year = 'present';
    } else {
        year = req.params.specifier + 's';
    }
    async.parallel({
        book_list: function(callback){
            Book.find({decade: specifier})
                .exec(callback)
        },
        poem_list: function(callback){
            Poem.find({decade: specifier})
                .exec(callback)
        },
        song_list: function(callback) {
            Song.find({decade: specifier, lyrics: { $ne: false }})
                .exec(callback)
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
        res.render('written-works', {
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