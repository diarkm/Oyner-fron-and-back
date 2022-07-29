const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ClassroomSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		owner: { type: mongoose.Types.ObjectId, ref: 'User' },
	},
	{ collection: 'classrooms' }
);

ClassroomSchema.plugin(mongoosePaginate);

const model = mongoose.model('Classroom', ClassroomSchema);

model.paginate().then({});

module.exports = model;
