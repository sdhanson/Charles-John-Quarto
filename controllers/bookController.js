var Book = require('../models/book');
var Poem = require('../models/poem')

var async = require('async');

// PROBABLY RENAME THIS PAGE TO MUSIC INDEX

exports.index = function(req, res) {
    // WANT TO FIND ALL ALBUMS AND ALL SONGS
    async.parallel({
        book_list: function(callback){
            Book.find({}, callback)
        },
        poem_list: function(callback) {
            Poem.find({}, callback)
        },
    }, function(err, results){
        if(err){
            console.log(err);
        } else {
            var title = 'Written Works';
            var subtitle = 'Poetry and Lyrics. ';
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
        }
    });
};

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Written Works Home Page');
};

// Display list of all books.
exports.book_list = function(req, res) {
    res.send('NOT IMPLEMENTED: book list');
};

// Display detail page for a specific book.
exports.book_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: book detail: ' + req.params.id);
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: book create GET');
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: book create POST');
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: book update POST');
};