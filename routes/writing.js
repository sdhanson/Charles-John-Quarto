var express = require('express');
var router = express.Router();

// Require controller modules.
var writing_controller = require('../controllers/writingController');

// GET writing with poem specifier
router.get('/category/poems', writing_controller.poems);

// GET writing with song specifier
router.get('/category/songs', writing_controller.songs);

// GET writing with collection specifier
router.get('/category/collections', writing_controller.collections);

// GET writing with decade specifier
router.get('/decade/:specifier', writing_controller.decade);

// GET specific poem
router.get('/poem/:id', writing_controller.single_poem);

// GET specific song
router.get('/song/:id', writing_controller.single_song);

// GET specific collection
router.get('/book/:id', writing_controller.single_collection);

// GET catalog home page.
router.get('/', writing_controller.index);

module.exports = router;