const jwt = require('jsonwebtoken');
const Classroom = require('../model/classroom');
const User = require('../model/user');

const JWT_SECRET = process.env.JWT_SECRET;

const AddClassroom = async (req, res) => {
	const { name, description } = req.body;
	const token = req.token;
	try {
		var _id;
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
			_id = decoded.id;
		});

		const user = await User.findById(_id);
		if (user.classroom) {
			return res.json({
				status: 'error',
				error: 'You already have a classroom',
			});
		}
		const classroom = await Classroom.create({
			name,
			description,
			owner: user,
		});
		await User.updateOne(
			{ _id },
			{
				$set: { classroom },
			}
		);
		res.json({ status: 'ok', data: classroom });
	} catch (error) {
		res.json({
			status: 'error',
			error: 'Something went wrong',
		});
	}
};

const EditClassroom = async (req, res) => {
	const { name, description } = req.body;
	const token = req.token;
	try {
		var _id;
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
			_id = decoded.id;
		});

		await Classroom.updateOne(
			{ owner: _id },
			{
				$set: { name, description },
			}
		);
		res.json({ status: 'ok' });
	} catch (error) {
		res.json({
			status: 'error',
			error: 'Something went wrong',
		});
	}
};

const GetClassroom = async (req, res) => {
	const token = req.token;
	try {
		var _id;
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
			_id = decoded.id;
		});

		const response = await Classroom.findOne({ owner: _id });
		if (!response)
			return res.json({
				status: 'error',
				error: 'You do not have a classroom yet',
			});
		res.json({ status: 'ok', data: response });
	} catch (error) {
		res.json({
			status: 'error',
			error: 'Something went wrong',
		});
	}
};

module.exports = { AddClassroom, EditClassroom, GetClassroom };
