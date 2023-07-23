var express = require('express');
var router = express.Router();



const { login, register, logout } = require('../controllers/auth.js');


router.post('/login', login);

router.post('/register', register);
router.post('/logout', logout);




module.exports = router;
