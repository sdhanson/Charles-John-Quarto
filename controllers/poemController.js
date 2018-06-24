var Poem = require('../models/poem');

// Display list of all poems.
exports.poem_list = function(req, res) {
    res.send('NOT IMPLEMENTED: poem list');
};

// Display detail page for a specific poem.
exports.poem_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: poem detail: ' + req.params.id);
};

// Display poem create form on GET.
exports.poem_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: poem create GET');
};

// Handle poem create on POST.
exports.poem_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: poem create POST');
};

// Display poem delete form on GET.
exports.poem_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: poem delete GET');
};

// Handle poem delete on POST.
exports.poem_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: poem delete POST');
};

// Display poem update form on GET.
exports.poem_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: poem update GET');
};

// Handle poem update on POST.
exports.poem_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: poem update POST');
};