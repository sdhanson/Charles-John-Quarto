var express = require('express');
var router = express.Router();

// Require controller modules.
var photo_controller = require('../controllers/photoController');

// GET catalog home page.
router.get('/', photo_controller.index);

module.exports = router;