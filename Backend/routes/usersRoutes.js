const express = require('express'),
	router = express.Router();

const verifyToken = require('./verifyToken');

const { GetUser } = require('../controllers/userController');

router.get('/', verifyToken, GetUser);

module.exports = router;
