var express = require('express');
var router = express.Router();

// Require controller modules.
var music_controller = require('../controllers/musicController');

// GET all albums
router.get('/category/song', music_controller.songs);

// GET all songs
router.get('/category/album', music_controller.albums);

// GET music with category specifier
router.get('/category/:specifier', music_controller.category);

// GET music with decade specifier
router.get('/decade/:specifier', music_controller.decade);

// GET catalog home page.
router.get('/', music_controller.index);

module.exports = router;