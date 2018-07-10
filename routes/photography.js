var express = require('express');
var router = express.Router();

// Require controller modules.
var photo_controller = require('../controllers/photoController');

/* PHOTOGRAPHY */
router.get('/', photo_controller.index);
/* END PHOTOGRAPHY */

module.exports = router;