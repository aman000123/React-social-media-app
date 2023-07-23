var express = require('express');
var router = express.Router();

const { getPosts, addPost, deletePost } = require('../controllers/post.js')


/* GET users listing. */
router.get('/', getPosts);
router.post('/', addPost);
router.delete('/:id', deletePost);




module.exports = router;
