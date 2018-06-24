var Collection = require('../models/collection');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all collections.
exports.collection_list = function(req, res) {
    res.send('NOT IMPLEMENTED: collection list');
};

// Display detail page for a specific collection.
exports.collection_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: collection detail: ' + req.params.id);
};

// Display collection create form on GET.
exports.collection_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: collection create GET');
};

// Handle collection create on POST.
exports.collection_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: collection create POST');
};

// Display collection delete form on GET.
exports.collection_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: collection delete GET');
};

// Handle collection delete on POST.
exports.collection_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: collection delete POST');
};

// Display collection update form on GET.
exports.collection_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: collection update GET');
};

// Handle collection update on POST.
exports.collection_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: collection update POST');
};