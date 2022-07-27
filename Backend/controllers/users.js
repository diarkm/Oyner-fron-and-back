const jwt = require('jsonwebtoken');
const User = require('../model/user');

const JWT_SECRET = process.env.JWT_SECRET;

/*const GetAllUsers = async (req, res) => {
	const { page } = req.body;
	const token = req.token;
	try {
		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				return res.status(500).send({
					message: err.message,
				});
			}
		});
		if (page) {
			const options = {
				page: page,
				limit: 10,
			};

			User.paginate({}, options, (err, result) => {
				if (err) return res.json({ status: 'error', error: err.body });
				else return res.json({ status: 'ok', data: result });
			});
		} else {
			User.find({}, (err, result) => {
				if (err) return res.json({ status: 'error', error: err.body });
				else return res.json({ status: 'ok', data: result });
			});
		}
	} catch (error) {
		res.json({
			status: 'error',
			error: 'You have no permissions to see this data',
		});
	}
};*/

const GetUser = async (req, res) => {
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
		const data = {
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			bonuses: user.bonuses,
			skinId: user.skinId,
		};
		res.json({ status: 'ok', data: data });
	} catch (error) {
		res.json({
			status: 'error',
			error: 'You have no permissions to see this data',
		});
	}
};

module.exports = { GetUser };
