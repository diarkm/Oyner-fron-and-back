const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
	{
		text: { type: String, required: true },
		quiz: { type: mongoose.Types.ObjectId, ref: 'Quiz', required: true },
		answers: [{ type: mongoose.Types.ObjectId, ref: 'Answer' }],
	},
	{ collection: 'questions' }
);

const model = mongoose.model('Question', QuestionSchema);

module.exports = model;
