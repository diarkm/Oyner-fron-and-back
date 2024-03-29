const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema(
	{
		text: { type: String, required: true },
		isCorrect: { type: Boolean, required: true },
	},
	{ collection: 'answers', timestamps: true }
);

const model = mongoose.model('Answer', AnswerSchema);

module.exports = model;
