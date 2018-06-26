var Album = require('../models/album');
var Song = require('../models/song');

var async = require('async');

// PROBABLY RENAME THIS PAGE TO MUSIC INDEX

exports.index = function(req, res) {
    // WANT TO FIND ALL ALBUMS AND ALL SONGS
    async.parallel({
        album_list: function(callback){
            Album.find({}, callback)
        },
        song_list: function(callback) {
            Song.find({}, callback)
        },
    }, function(err, results){
        if(err){
            console.log(err);
        } else {
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
                image: image
            });
        }
    });
};

// Display list of all Authors.
exports.album_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Album list');
};

// Display detail page for a specific Author.
exports.album_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Album detail: ' + req.params.id);
};

// Display Author create form on GET.
exports.album_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Album create GET');
};

// Handle Author create on POST.
exports.album_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Album create POST');
};

// Display Author delete form on GET.
exports.album_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Album delete GET');
};

// Handle Author delete on POST.
exports.album_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Album delete POST');
};

// Display Author update form on GET.
exports.album_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Album update GET');
};

// Handle Author update on POST.
exports.album_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Album update POST');
};