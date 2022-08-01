const express = require('express'),
	router = express.Router();

const verifyToken = require('./verifyToken');

const {
	ChangePassword,
	Login,
	Register,
} = require('../controllers/authController');

const {
	StudentChangePassword,
	StudentLogin,
	StudentRegister,
} = require('../controllers/studentController');

router.post('/change-password', verifyToken, ChangePassword);
router.post('/login', Login);
router.post('/register', Register);

router.post('/student/change-password', verifyToken, StudentChangePassword);
router.post('/student/login', StudentLogin);
router.post('/student/register', StudentRegister);

module.exports = router;
