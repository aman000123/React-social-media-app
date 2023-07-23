var express = require('express');
var router = express.Router();

var { getComments, addComments } = require('../controllers/comment.js')


/* GET users listing. */
router.get('/', getComments);
router.post('/', addComments);




module.exports = router;
