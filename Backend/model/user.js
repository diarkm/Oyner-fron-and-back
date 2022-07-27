const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		password: { type: String, required: true },
		bonuses: { type: Number, default: 0 },
		skinId: { type: Number, default: 1 },
	},
	{ collection: 'users' }
);

UserSchema.plugin(mongoosePaginate);

const model = mongoose.model('UserSchema', UserSchema);

model.paginate().then({});

module.exports = model;
