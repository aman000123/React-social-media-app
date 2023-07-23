var express = require('express');
var router = express.Router();

var { getLikes, addLikes, deleteLikes } = require('../controllers/like.js')


/* GET users listing. */
router.get('/', getLikes);
router.post('/', addLikes);
router.delete('/', deleteLikes);




module.exports = router;
