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
            Song.find({lyrics: true})
            .exec(callback)
        }
    }, function(err, results){
        if(err){
            return next(err);
        }
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
            image: image
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
            image: image
        });

    });
};

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
            Song.find({lyrics: true})
                .exec(callback)
        },
    }, function(err, results){
        if(err){
            return next(err);
        }
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
            image: image
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
            image: image
        });

    });
};

exports.decade = function(req, res, next) {
    async.parallel({
        book_list: function(callback){
            Book.find({decade: req.params.specifier})
                .exec(callback)
        },
        poem_list: function(callback){
            Poem.find({decade: req.params.specifier})
                .exec(callback)
        },
        song_list: function(callback) {
            Song.find({decade: req.params.specifier})
                .exec(callback)
        },
    }, function(err, results){
        if(err){
            return next(err);
        }
        var title = 'Written Works';
        var subtitle = 'Written work from the ' + req.params.specifier + '. ';
        var link = 'Shop Now.';
        var image = '/images/water.jpg';
        res.render('written-works', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image
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
            Poem.findOne({})
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
            image: image
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
            image: image
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
            image: image
        });

    });
};