var express = require('express');
var router = express.Router();

var { getUser, updateUser } = require('../controllers/user')


/* GET users listing. */
router.get('/find/:userid', getUser);
router.put('/', updateUser);




module.exports = router;
