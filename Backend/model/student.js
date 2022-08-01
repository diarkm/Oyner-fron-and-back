const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const StudentSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true, select: false },
		classroom: { type: mongoose.Types.ObjectId, ref: 'Classroom' },
	},
	{ collection: 'students' }
);

StudentSchema.plugin(mongoosePaginate);

const model = mongoose.model('Student', StudentSchema);

model.paginate().then({});

module.exports = model;
