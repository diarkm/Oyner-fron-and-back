const jwt = require('jsonwebtoken');
const User = require('../model/user');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET;

const ChangePassword = async (req, res) => {
	const { newPassword: plainTextPassword } = req.body;
	const token = req.token;

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({
			status: 'Error',
			error: 'Invalid password',
		});
	}

	if (plainTextPassword.length < 8) {
		return res.json({
			status: 'Error',
			error: 'Password too small. Should be atleast 8 characters',
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

		await User.updateOne(
			{ _id },
			{
				$set: { password },
			}
		);
		res.json({ status: 'ok' });
	} catch (error) {
		res.json({ status: 'error', error: 'Incorrect password' });
	}
};

const Login = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username }).select('+password').lean();

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username or password' });
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

	res.json({ status: 'error', error: 'Invalid username or password' });
};

const Register = async (req, res) => {
	const {
		username,
		email,
		firstName,
		lastName,
		password: plainTextPassword,
	} = req.body;

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' });
	}

	if (!email || typeof email !== 'string' || !validateEmail(email)) {
		return res.json({ status: 'error', error: 'Please enter your email' });
	}

	if (!firstName || typeof firstName !== 'string') {
		return res.json({ status: 'error', error: 'Please enter your first name' });
	}

	if (!lastName || typeof lastName !== 'string') {
		return res.json({ status: 'error', error: 'Please enter your last name' });
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' });
	}

	if (plainTextPassword.length < 8) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 8 characters',
		});
	}

	const password = await bcrypt.hash(plainTextPassword, 10);

	if (await User.findOne({ username: username }).select(username).lean()) {
		return res.json({
			status: 'error',
			error: 'Username should be unique',
		});
	}

	if (await User.findOne({ email: email }).select(email).lean()) {
		return res.json({
			status: 'error',
			error: 'Email should be unique',
		});
	}

	try {
		const response = await User.create({
			username,
			email,
			firstName,
			lastName,
			password,
		});
		console.log('User created successfully: ', response);
	} catch (error) {
		if ((error.code = 11000)) {
			return res.json({ status: 'error', error: 'Something went wrong' });
		}
		throw error;
	}

	res.json({ status: 'ok' });
};

const validateEmail = (email) => {
	var validRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(validRegex)) {
		return true;
	} else {
		return false;
	}
};

module.exports = { ChangePassword, Login, Register };
