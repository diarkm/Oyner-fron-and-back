const express = require('express'),
	router = express.Router();

const verifyToken = require('./verifyToken');

const {
	AddClassroom,
	EditClassroom,
	GetClassroom,
} = require('../controllers/classroomController');

const {
	AddQuiz,
	EditQuiz,
	GetQuiz,
	GetAllQuiz,
	StartQuiz,
} = require('../controllers/quizController');

const {
	AddQuestion,
	EditQuestion,
	GetQuestion,
} = require('../controllers/questionController');

const {
	AddAnswer,
	EditAnswer,
	GetAnswer,
} = require('../controllers/answerController');

const {
	CreateAttempt,
	MakeAnswer,
} = require('../controllers/attemptController');

router.post('/classroom/add', verifyToken, AddClassroom);
router.post('/classroom/edit', verifyToken, EditClassroom);
router.get('/classroom', verifyToken, GetClassroom);

router.post('/quiz/add', verifyToken, AddQuiz);
router.post('/quiz/edit', verifyToken, EditQuiz);
router.get('/quiz/', verifyToken, GetQuiz);
router.get('/quiz/all', verifyToken, GetAllQuiz);
router.post('/quiz/start', verifyToken, CreateAttempt);
router.post('/quiz/answer', verifyToken, MakeAnswer);

router.post('/qst/add', verifyToken, AddQuestion);
router.post('/qst/edit', verifyToken, EditQuestion);
router.get('/qst/', verifyToken, GetQuestion);

router.post('/ans/add', verifyToken, AddAnswer);
router.post('/ans/edit', verifyToken, EditAnswer);
router.get('/ans/', verifyToken, GetAnswer);

module.exports = router;
