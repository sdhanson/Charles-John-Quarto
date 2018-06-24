var Song = require('../models/song');

// Display list of all songs.
exports.song_list = function(req, res) {
    res.send('NOT IMPLEMENTED: song list');
};

// Display detail page for a specific song.
exports.song_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: song detail: ' + req.params.id);
};

// Display song create form on GET.
exports.song_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: song create GET');
};

// Handle song create on POST.
exports.song_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: song create POST');
};

// Display song delete form on GET.
exports.song_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: song delete GET');
};

// Handle song delete on POST.
exports.song_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: song delete POST');
};

// Display song update form on GET.
exports.song_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: song update GET');
};

// Handle song update on POST.
exports.song_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: song update POST');
};