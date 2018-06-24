var Photo = require('../models/photo');

var async = require('async');

exports.index = function(req, res) {
    async.parallel({
        photo_count: function(callback) {
            Photo.count({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        photo_guide: function(callback) {
            Photo.find({}, callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        var title = 'Photo Gallery';
        var subtitle = '';
        var link = '';
        var image = '/images/rivers.jpeg';
        res.render('photography', { title: title, error: err, data: results, subtitle: subtitle, link: link, image: image });
    });
};

//
// // Display list of all photos.
// exports.photo_list = function(req, res) {
//
//
// };
//
// // Display detail page for a specific photo.
// exports.photo_detail = function(req, res) {
//     res.send('NOT IMPLEMENTED: photo detail: ' + req.params.id);
// };
//
// // Display photo create form on GET.
// exports.photo_create_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: photo create GET');
// };
//
// // Handle photo create on POST.
// exports.photo_create_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: photo create POST');
// };
//
// // Display photo delete form on GET.
// exports.photo_delete_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: photo delete GET');
// };
//
// // Handle photo delete on POST.
// exports.photo_delete_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: photo delete POST');
// };
//
// // Display photo update form on GET.
// exports.photo_update_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: photo update GET');
// };
//
// // Handle photo update on POST.
// exports.photo_update_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: photo update POST');
// };