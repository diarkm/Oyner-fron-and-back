const jwt = require('jsonwebtoken');
const Student = require('../model/student');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET;

const StudentChangePassword = async (req, res) => {
	const { newPassword: plainTextPassword } = req.body;
	const token = req.token;

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({
			status: 'Error',
			error: 'Invalid password for Student',
		});
	}

	if (plainTextPassword.length < 4) {
		return res.json({
			status: 'Error',
			error: 'Password too small for Student. Should be atleast 8 characters',
		});
	}

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

		const password = await bcrypt.hash(plainTextPassword, 10);

		await Student.updateOne(
			{ _id },
			{
				$set: { password },
			}
		);
		res.json({ status: 'ok' });
	} catch (error) {
		res.json({ status: 'error', error: 'Incorrect password for Student' });
	}
};

const StudentLogin = async (req, res) => {
	const { username, password } = req.body;
	const user = await Student.findOne({ username }).select('+password').lean();

	if (!user) {
		return res.json({
			status: 'error',
			error: 'Invalid username or password for Student',
		});
	}

	if (await bcrypt.compare(password, user.password)) {
		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
			},
			JWT_SECRET
		);

		return res.json({ status: 'ok', data: token });
	}

	res.json({
		status: 'error',
		error: 'Invalid username or password for Student',
	});
};

const StudentRegister = async (req, res) => {
	const { classroomId, username, password: plainTextPassword } = req.body;

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username for Student' });
	}

	if (!classroomId || typeof classroomId !== 'string') {
		return res.json({
			status: 'error',
			error: 'Invalid classroomId for Student',
		});
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password for Student' });
	}

	if (plainTextPassword.length < 4) {
		return res.json({
			status: 'error',
			error: 'Password too small for Student. Should be atleast 8 characters',
		});
	}

	const password = await bcrypt.hash(plainTextPassword, 10);

	if (
		await Student.findOne({ username: username, classroom: classroomId })
			.select(username)
			.lean()
	) {
		return res.json({
			status: 'error',
			error: 'Username for Student should be unique',
		});
	}
	try {
		const response = await Student.create({
			username,
			password,
			classroom: classroomId,
		});
		console.log('Student created successfully: ', response);
	} catch (error) {
		if ((error.code = 11000)) {
			return res.json({ status: 'error', error: 'Something went wrong' });
		}
		throw error;
	}

	res.json({ status: 'ok' });
};

const GetAllStudents = async (req, res) => {
	const { page } = req.params || 1;
	const token = req.token;
	try {
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
		});

		const options = {
			page: page,
			limit: 10,
		};

		Student.paginate({}, options, (err, result) => {
			if (err) return res.json({ status: 'error', error: err.body });
			else {
				return res.json({
					status: 'ok',
					data: result,
				});
			}
		});
	} catch (error) {
		res.json({
			status: 'error',
			error: 'You have no permissions to see this data',
		});
	}
};

const GetStudent = async (req, res) => {
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

		const student = await Student.findById(_id);
		res.json({ status: 'ok', data: student });
	} catch (error) {
		res.json({
			status: 'error',
			error: 'You have no permissions to see this data',
		});
	}
};

module.exports = {
	StudentChangePassword,
	StudentLogin,
	StudentRegister,
	GetAllStudents,
	GetStudent,
};
