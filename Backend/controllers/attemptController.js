const jwt = require('jsonwebtoken');
const Attempt = require('../model/attempt');
const AttemptAnswers = require('../model/attemptAnswers');

const JWT_SECRET = process.env.JWT_SECRET;

const CreateAttempt = async (req, res) => {
	const { quizId } = req.body;
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

		const attempt = await Attempt.create({
			student: _id,
			quiz: quizId,
		});

		res.json({ status: 'ok', data: attempt });
	} catch (error) {
		res.json({
			status: 'error',
			error: 'Something went wrong',
		});
	}
};

const MakeAnswer = async (req, res) => {
	const { attemptId, quesId, answers } = req.body;
	const token = req.token;

	try {
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
		});

		const attemptAnswer = await AttemptAnswers.create({
			attempt: attemptId,
			question: quesId,
			answers: JSON.parse(answers),
		});

		await Attempt.updateOne(
			{ _id: attemptId },
			{ $push: { studentAnswers: attemptAnswer } }
		);

		res.json({ status: 'ok', data: attemptAnswer });
	} catch (error) {
		res.json({
			status: 'error',
			error: 'Something went wrong',
		});
	}
};

module.exports = {
	CreateAttempt,
	MakeAnswer,
};
