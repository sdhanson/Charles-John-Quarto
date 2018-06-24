var express = require('express');
var router = express.Router();

// Require controller modules.
var poem_controller = require('../controllers/poemController');
var song_controller = require('../controllers/songController');
var book_controller = require('../controllers/bookController');

/// COLLECTION ROUTES ///

// GET catalog home page.
router.get('/written-work', book_controller.index);

// // GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
// router.get('/book/create', book_controller.book_create_get);
//
// // POST request for creating Book.
// router.post('/book/create', book_controller.book_create_post);
//
// // GET request to delete Book.
// router.get('/book/:id/delete', book_controller.book_delete_get);
//
// // POST request to delete Book.
// router.post('/book/:id/delete', book_controller.book_delete_post);
//
// // GET request to update Book.
// router.get('/book/:id/update', book_controller.book_update_get);
//
// // POST request to update Book.
// router.post('/book/:id/update', book_controller.book_update_post);

// GET request for one Book.
router.get('/book/:id', book_controller.book_detail);

// GET request for list of all Book items.
router.get('/books', book_controller.book_list);

/// POEM ROUTES ///

// // GET request for creating Author. NOTE This must come before route for id (i.e. display author).
// router.get('/author/create', author_controller.author_create_get);
//
// // POST request for creating Author.
// router.post('/author/create', author_controller.author_create_post);
//
// // GET request to delete Author.
// router.get('/author/:id/delete', author_controller.author_delete_get);
//
// // POST request to delete Author.
// router.post('/author/:id/delete', author_controller.author_delete_post);
//
// // GET request to update Author.
// router.get('/author/:id/update', author_controller.author_update_get);
//
// // POST request to update Author.
// router.post('/author/:id/update', author_controller.author_update_post);

// GET request for one Author.
router.get('/poem/:id', poem_controller.poem_detail);

// GET request for list of all Authors.
router.get('/poems', poem_controller.poem_list);

/// SONG ROUTES ///

// // GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
// router.get('/genre/create', genre_controller.genre_create_get);
//
// //POST request for creating Genre.
// router.post('/genre/create', genre_controller.genre_create_post);
//
// // GET request to delete Genre.
// router.get('/genre/:id/delete', genre_controller.genre_delete_get);
//
// // POST request to delete Genre.
// router.post('/genre/:id/delete', genre_controller.genre_delete_post);
//
// // GET request to update Genre.
// router.get('/genre/:id/update', genre_controller.genre_update_get);
//
// // POST request to update Genre.
// router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/song/:id', song_controller.song_detail);

// GET request for list of all Genre.
router.get('/songs', song_controller.song_list);

module.exports = router;