const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		password: { type: String, required: true, select: false },
		classroom: { type: mongoose.Types.ObjectId, ref: 'Classroom' },
	},
	{ collection: 'users', timestamps: true }
);

UserSchema.plugin(mongoosePaginate);

const model = mongoose.model('User', UserSchema);

model.paginate().then({});

module.exports = model;
