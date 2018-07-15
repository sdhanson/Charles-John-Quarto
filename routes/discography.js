var express = require('express');
var router = express.Router();

// Require controller modules.
var music_controller = require('../controllers/musicController');

/* DISCOGRAPHY */
router.get('/decade/:specifier', function(req, res, next) {
    var page = req.params.specifier.toLowerCase();
    if(page === "1960" || page === "1970" || page === "1980" || page === "1990" || page === "2000" || page === "present") {
        music_controller.decade(req, res);
    } else {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

router.get('/category/:specifier', function(req, res, next) {
    var page = req.params.specifier.toLowerCase();
    if(page === "collaboration"|| page === "single") {
        music_controller.category(req, res);
    } else if (page === "album") {
        music_controller.albums(req, res);
    } else if (page === "song" ) {
        music_controller.songs(req, res);
    } else {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

router.get('/', music_controller.index);

module.exports = router;