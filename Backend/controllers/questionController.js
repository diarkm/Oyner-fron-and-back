const jwt = require('jsonwebtoken');
const Quiz = require('../model/quiz');
const Question = require('../model/question');

const JWT_SECRET = process.env.JWT_SECRET;

const AddQuestion = async (req, res) => {
	const { quizId, text } = req.body;
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

		if (!quiz)
			return res.json({
				status: 'error',
				error: 'Cannot find this quiz',
			});

		const question = await Question.create({
			text,
			quiz,
		});

		await Quiz.updateOne({ _id: quizId }, { $push: { questions: question } });

		res.json({ status: 'ok', data: question });
	} catch (error) {
		res.json({
			status: 'error',
			error: 'Something went wrong',
		});
	}
};

const EditQuestion = async (req, res) => {
	const { quesId, text } = req.body;
	const token = req.token;
	try {
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
		});

		await Question.updateOne(
			{ _id: quesId },
			{
				$set: { text },
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

const GetQuestion = async (req, res) => {
	const { quesId } = req.body;
	const token = req.token;
	try {
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
		});

		const question = await Question.findOne({ _id: quesId })
			.select('-quiz')
			.lean();

		if (!question)
			return res.json({ status: 'error', error: 'Cannot find this question' });

		res.json({ status: 'ok', data: question });
	} catch (error) {
		res.json({
			status: 'error',
			error: 'Something went wrong.',
		});
	}
};

module.exports = {
	AddQuestion,
	EditQuestion,
	GetQuestion,
};
