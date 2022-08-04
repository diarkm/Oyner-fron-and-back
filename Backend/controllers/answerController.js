const jwt = require('jsonwebtoken');
const Question = require('../model/question');
const Answer = require('../model/answer');

const JWT_SECRET = process.env.JWT_SECRET;

const AddAnswer = async (req, res) => {
	const { quesId, ans } = req.body;
	const token = req.token;
	try {
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
		});

		const answers = await Answer.insertMany(JSON.parse(ans));

		await Question.updateOne({ _id: quesId }, { $push: { answers } });

		res.json({ status: 'ok' });
	} catch (error) {
		console.log(error);
		res.json({
			status: 'error',
			error: 'Something went wrong',
		});
	}
};

const EditAnswer = async (req, res) => {
	const { ansId, text, isCorrect } = req.body;
	const token = req.token;
	try {
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
		});

		await Answer.updateOne(
			{ _id: ansId },
			{
				$set: { text, isCorrect },
			}
		);

		res.json({ status: 'ok' });
	} catch (error) {
		res.json({
			status: 'error',
			error: 'Something went wrong.',
		});
	}
};

const GetAnswer = async (req, res) => {
	const { ansId } = req.params;
	const token = req.token;
	try {
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
		});

		const answer = await Answer.findOne({ _id: ansId });

		if (!answer)
			return res.json({ status: 'error', error: 'Cannot find this answer' });

		res.json({ status: 'ok', data: answer });
	} catch (error) {
		res.json({
			status: 'error',
			error: 'Something went wrong.',
		});
	}
};

module.exports = {
	AddAnswer,
	EditAnswer,
	GetAnswer,
};
