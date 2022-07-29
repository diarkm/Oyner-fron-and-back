const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const QuizSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		classroom: { type: mongoose.Types.ObjectId, ref: 'Classroom' },
	},
	{ collection: 'quizes' }
);

QuizSchema.plugin(mongoosePaginate);

const model = mongoose.model('Quiz', QuizSchema);

model.paginate().then({});

module.exports = model;
