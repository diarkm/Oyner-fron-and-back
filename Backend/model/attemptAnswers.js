const mongoose = require('mongoose');

const AttemptAnswersSchema = new mongoose.Schema(
	{
		attempt: { type: mongoose.Types.ObjectId, ref: 'Attempt' },
		question: { type: mongoose.Types.ObjectId, ref: 'Question' },
		answers: [{ type: mongoose.Types.ObjectId, ref: 'Answers' }],
	},
	{ collection: 'attemptsAnswers', timestamps: true }
);

const model = mongoose.model('AttemptAnswers', AttemptAnswersSchema);

module.exports = model;
