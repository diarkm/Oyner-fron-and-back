const jwt = require('jsonwebtoken');
const Classroom = require('../model/classroom');
const User = require('../model/user');
const Quiz = require('../model/quiz');

const JWT_SECRET = process.env.JWT_SECRET;

const AddQuiz = async (req, res) => {
	const { name, description } = req.body;
	const token = req.token;
	try {
		var _id;
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
			_id = decoded.id;
		});

		const classroom = await Classroom.findOne({ owner: _id });

		if (!classroom)
			return res.json({
				status: 'error',
				error: 'You do not have a classroom to add a quiz',
			});

		const response = await Quiz.create({
			name,
			description,
			classroom,
		});

		res.json({ status: 'ok', data: response });
	} catch (error) {
		res.json({
			status: 'error',
			error: 'Something went wrong',
		});
	}
};

const EditQuiz = async (req, res) => {
	const { quizId, name, description } = req.body;
	const token = req.token;
	try {
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
		});

		await Quiz.updateOne(
			{ _id: quizId },
			{
				$set: { name, description },
			}
		);

		res.json({ status: 'ok' });
	} catch (error) {
		res.json({
			status: 'error',
			error: 'You do not have permission to do this.',
		});
	}
};

const GetQuiz = async (req, res) => {
	const { quizId } = req.params;
	const token = req.token;
	try {
		console.log(quizId);
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
		});

		const response = await Quiz.findOne({ _id: quizId })
			.lean()
			.populate({
				path: 'questions',
				populate: { path: 'answers' },
			});

		if (!response)
			return res.json({ status: 'error', error: 'Cannot find this quiz' });

		res.json({ status: 'ok', data: response });
	} catch (error) {
		res.json({
			status: 'error',
			error: 'You do not have permission to do this.',
		});
	}
};

const GetAllQuiz = async (req, res) => {
	const { page } = req.params || 1;
	const token = req.token;
	try {
		var _id;
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
			_id = decoded.id;
		});

		const classroom = await Classroom.findOne({ owner: _id });

		const options = {
			page: page,
			limit: 10,
		};
		Quiz.paginate({ classroom }, options, (err, result) => {
			if (err) return res.json({ status: 'error', error: err.body });
			else return res.json({ status: 'ok', data: result });
		});
	} catch (error) {
		res.json({
			status: 'error',
			error: 'You do not have permission to do this.',
		});
	}
};

const StartQuiz = async (req, res) => {
	const { quizId } = req.body;
	const token = req.token;
	try {
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
		});

		const quiz = await Quiz.findOne({ _id: quizId });

		const response = quiz.createQuiz();

		console.log(response);
	} catch (error) {
		res.json({
			status: 'error',
			error: 'You do not have permission to do this.',
		});
	}
};

module.exports = { AddQuiz, EditQuiz, GetQuiz, GetAllQuiz, StartQuiz };
