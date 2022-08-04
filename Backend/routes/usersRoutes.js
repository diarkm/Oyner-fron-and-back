const express = require('express'),
	router = express.Router();

const verifyToken = require('./verifyToken');

const { GetUser } = require('../controllers/userController');
const {
	GetAllStudents,
	GetStudent,
} = require('../controllers/studentController');

router.get('/', verifyToken, GetUser);

router.get('/student/all/:page', verifyToken, GetAllStudents);
router.get('/student/', verifyToken, GetStudent);

module.exports = router;
