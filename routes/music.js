var express = require('express');
var router = express.Router();

// Require controller modules.
var album_controller = require('../controllers/albumController');
var song_controller = require('../controllers/songController');
/// COLLECTION ROUTES ///

// GET catalog home page.
router.get('/discography', album_controller.index);

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
router.get('/album/:id', album_controller.album_detail);

// GET request for list of all Book items.
router.get('/albums', album_controller.album_list);

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