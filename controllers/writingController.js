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
        var title = 'WRITTEN WORKS';
        var image = '/images/sky.jpg';
        var count = results.book_count + results.poem_count + results.song_count;
        res.render('written-works', {
            title: title,
            results: results,
            image: image,
            current: page,
            pages: Math.ceil(count/(perPage*3)),
        });
    });
};

exports.poems = function(req, res, next) {
    var perPage = 6;
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
        var title = 'POEMS';
        var image = '/images/sky.jpg';
        var count = results.poem_count;
        res.render('written-works', {
            title: title,
            results: results,
            image: image,
            current: page,
            pages: Math.ceil(count/perPage),
        });

    });
};

// DONT THINK LYRICS TRUE WORKS
exports.songs = function(req, res, next) {
    var perPage = 6;
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
        var title = 'SONGS';
        var image = '/images/sky.jpg';
        var count = results.song_count;
        res.render('written-works', {
            title: title,
            results: results,
            image: image,
            current: page,
            pages: Math.ceil(count/perPage),
        });

    });
};

exports.collections = function(req, res, next) {
    var perPage = 6;
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
        var title = 'COLLECTIONS';
        var image = '/images/sky.jpg';
        var count = results.book_count;
        res.render('written-works', {
            title: title,
            results: results,
            image: image,
            current: page,
            pages: Math.ceil(count/perPage),
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
        var title = results.song.title;
        var image = '/images/sunset.jpg';
        res.render('poem', {
            title: title,
            results: results,
            image: image,
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
        var title = results.poem.title;
        var image = '/images/sunset.jpg';
        res.render('poem', {
            title: title,
            results: results,
            image: image,
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
        var title = results.book.title;
        var image = '/images/sunset.jpg';
        res.render('collection', {
            title: title,
            results: results,
            image: image,
        });

    });
};