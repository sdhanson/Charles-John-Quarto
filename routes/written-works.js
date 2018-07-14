var express = require('express');
var router = express.Router();

// Require controller modules.
var writing_controller = require('../controllers/writingController');

/* WRITTEN WORKS */


router.get('/decade/:specifier/:page', function(req, res, next) {
    var page = req.params.specifier.toLowerCase();
    if(page === "1960" || page === "1970" || page === "1980" || page === "1990" || page === "2000" || page === "present") {
        writing_controller.decade(req, res);
    }  else{
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

router.get('/decade/:specifier', function(req, res, next) {
    res.redirect('/written-works/decade/'+ req.params.specifier + '/1');

});


router.get('/category/collections/songs', function(req, res, next) {
    res.redirect('/written-works/category/collections/songs/1');
});

router.get('/category/collections/poetry', function(req, res, next) {
    res.redirect('/written-works/category/collections/poetry/1');
});

router.get('/category/collections/:ty/:page', function(req, res, next) {
    var cat = req.params.ty.toLowerCase();
    if((cat === 'songs' || cat === 'poetry')) {
        if(cat === "songs") {
            writing_controller.song_collections(req, res, next);
        } else if(cat === 'poetry') {
            // GET writing with collection specifier
            writing_controller.poetry_collections(req, res, next);
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

router.get('/category/:specifier/:page', function(req, res, next) {
    var p = req.params.specifier.toLowerCase();
    if(p === "poems" || p === "songs" || p === "collections" || p === "poem" || p === "song" || p === "collection") {
        if(p === "songs" || p === "song") {
            writing_controller.songs(req, res);
        } else if(p === "collections" || p === "collection") {
            // GET writing with collection specifier
            writing_controller.collections(req, res);
        } else if (p === "poems" || p === "poem") {
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

router.get('/category/:specifier', function(req, res, next) {
    res.redirect('/written-works/category/'+ req.params.specifier + '/1');

});


router.get('/:ty/:specifier/:page', function(req, res, next) {
    req.params.id = req.params.specifier;
    var type = req.params.ty.toLowerCase();
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

router.get('/:ty/:specifier', function(req, res, next) {
    res.redirect('/written-works/'+ req.params.ty + '/' + req.params.specifier + '/1');

});

router.get('/', function(req, res, next) {
    res.redirect('/written-works/1');

});

router.get('/:page', writing_controller.index);

module.exports = router;