var express = require('express');
var router = express.Router();



const { getRelationShip, addNewRelationShip, deleteRelationShip } = require('../controllers/relationship.js');


router.get('/', getRelationShip);
router.post('/', addNewRelationShip);
router.delete('/', deleteRelationShip);




module.exports = router;