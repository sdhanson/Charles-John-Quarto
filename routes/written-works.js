var express = require('express');
var router = express.Router();

// Require controller modules.
var writing_controller = require('../controllers/writingController');

/* WRITTEN WORKS */
router.get('/decade/:specifier', function(req, res, next) {
    var page = req.params.specifier.toLowerCase();
    if(page === "1960" || page === "1970" || page === "1980" || page === "1990" || page === "2000" || page === "present") {
        writing_controller.decade(req, res);
    }  else{
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

router.get('/category/:specifier', function(req, res, next) {
    var page = req.params.specifier.toLowerCase();
    if(page === "poems" || page === "songs" || page === "collections") {
        if(page === "songs") {
            writing_controller.songs(req, res);
        } else if(page === "collections") {
            // GET writing with collection specifier
            writing_controller.collections(req, res);
        } else if (page === "poems") {
            // GET writing with poem specifier
            writing_controller.poems(req, res);
        } else {
            var err1 = new Error('Not Found');
            err1.status = 404;
            next(err1);
        }
    } else{
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

router.get('/:type/:specifier', function(req, res, next) {
    req.params.id = req.params.specifier;
    var type = req.params.type.toLowerCase();
    if(type === "song" || type === "book" || type === "poem" ) {
        if(type === "song") {
            writing_controller.single_song(req, res);
        } else if(type === "book") {
            // GET writing with collection specifier
            writing_controller.single_collection(req, res);
        } else if (type === "poem") {
            // GET writing with poem specifier
            writing_controller.single_poem(req, res);
        } else {
            var err1 = new Error('Not Found');
            err1.status = 404;
            next(err1);
        }

    } else{
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

router.get('/', writing_controller.index);

module.exports = router;