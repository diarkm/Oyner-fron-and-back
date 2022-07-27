const express = require('express'),
	router = express.Router();

const verifyToken = require('./verifyToken');

const { ChangePassword, Login, Register } = require('../controllers/auth');

router.post('/change-password', verifyToken, ChangePassword);
router.post('/login', Login);
router.post('/register', Register);

module.exports = router;
