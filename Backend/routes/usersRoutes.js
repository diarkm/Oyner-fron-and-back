const express = require('express'),
	router = express.Router();

const verifyToken = require('./verifyToken');

const { GetUser } = require('../controllers/users');

router.get('/', verifyToken, GetUser);

module.exports = router;
