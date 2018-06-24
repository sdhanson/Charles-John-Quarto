var express = require('express');
var router = express.Router();

// Require controller modules.
var photo_controller = require('../controllers/photoController');

/// COLLECTION ROUTES ///

// GET catalog home page.
router.get('/', photo_controller.index);

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

// // GET request for one Book.
// router.get('/photo/:id', photo_controller.photo_detail);
//
// // GET request for list of all Book items.
// router.get('/photos', photo_controller.photo_list);

module.exports = router;