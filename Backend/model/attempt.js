const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const AttemptSchema = new mongoose.Schema(
	{
		student: { type: mongoose.Types.ObjectId, ref: 'Student' },
		quiz: { type: mongoose.Types.ObjectId, ref: 'Quiz' },
		studentAnswers: [{ type: mongoose.Types.ObjectId, ref: 'AttemptAnswers' }],
	},
	{ collection: 'attempts', timestamps: true }
);

AttemptSchema.plugin(mongoosePaginate);

const model = mongoose.model('Attempt', AttemptSchema);

model.paginate().then({});

module.exports = model;
