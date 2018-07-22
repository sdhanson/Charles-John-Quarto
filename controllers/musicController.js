// Controller for the discography page //
// Uses album and song schemas / collections to show the info that is queried for
var Album = require('../models/album');
var Song = require('../models/song');

var async = require('async');

// IF I END UP JUST USING WRITTEN WORK CAN REMOVE ALL OF THE SONG LIST STUFF AND REFACTOR

exports.index = function(req, res, next) {
    async.parallel({
        album_list: function(callback){
            Album.find({})
                .exec(callback)
        },
        song_list: function(callback) {
            Song.find({})
                .exec(callback)
        },
    }, function(err, results){
        if(err){
            return next(err);
        }
        var sub = false;
        var titlesub = '';
        var title = 'Discography';
        var subtitle = '';
        var link = '';
        var image = '/images/rocks.jpeg';
        res.render('discography', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image,
            titlesub: titlesub, sub: sub
        });
});
};

exports.songs = function(req, res, next) {
    async.parallel({
        album_list: function(callback) {
            Album.find({category: 'Null'})
                .exec(callback)
        },
        song_list: function(callback) {
            Song.find({})
                .exec(callback)
        },
    }, function(err, results){
        if(err){
            return next(err);
        }
        var sub = false;
        var titlesub = '';
        var title = 'Discography';
        var subtitle = '';
        var link = '';
        var image = '/images/rocks.jpeg';
        res.render('discography', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image,
            titlesub: titlesub, sub: sub
        });

    });
};

exports.albums = function(req, res, next) {
    async.parallel({
        album_list: function(callback) {
            Album.find({})
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
        var title = 'Discography';
        var subtitle = '';
        var link = '';
        var image = '/images/rocks.jpeg';
        res.render('discography', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image,
            titlesub: titlesub, sub: sub
        });

    });
};

exports.category = function(req, res, next) {
    var specifier = req.params.specifier.charAt(0).toUpperCase() + req.params.specifier.slice(1);

    async.parallel({
        album_list: function(callback){
            Album.find({category: specifier})
                .exec(callback)
        },
        song_list: function(callback) {
            Song.find({category: specifier})
                .exec(callback)
        },
    }, function(err, results){
        if(err){
            return next(err);
        }
        var sub = false;
        var titlesub = '';
        var title = 'Discography';
        var subtitle = '';
        var link = '';
        var image = '/images/rocks.jpeg';
        res.render('discography', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image, titlesub: titlesub, sub: sub
        });

    });
};

exports.decade = function(req, res, next) {
    var specifier = req.params.specifier.charAt(0).toUpperCase() + req.params.specifier.slice(1);
    async.parallel({
        album_list: function(callback){
            Album.find({decade: specifier})
                .exec(callback)
        },
        song_list: function(callback) {
            Song.find({decade: specifier})
                .exec(callback)
        },
    }, function(err, results){
        if(err){
            return next(err);
        }
        var sub = false;
        var titlesub = '';
        var title = 'Discography';
        var subtitle = '';
        var link = '';
        var image = '/images/rocks.jpeg';
        res.render('discography', {
            title: title,
            error: err,
            results: results,
            subtitle: subtitle,
            link: link,
            image: image, titlesub: titlesub, sub: sub
        });
    });
};