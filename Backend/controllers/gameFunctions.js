const jwt = require('jsonwebtoken');
const User = require('../model/user');

const JWT_SECRET = process.env.JWT_SECRET;

const ChangeBonuses = async (req, res) => {
	const { bonus } = req.body;
	const token = req.token;

	if (!bonus || typeof bonus !== 'string') {
		return res.json({
			status: 'Error',
			error: 'Invalid bonus',
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

		await User.findOneAndUpdate({ _id }, { $inc: { bonuses: bonus } });
		res.json({ status: 'ok' });
	} catch (error) {
		res.json({ status: 'error', error: 'Bonus should be a number' });
	}
};

const ChangeSkinId = async (req, res) => {
	const { skinId } = req.body;
	const token = req.token;

	if (!skinId || typeof skinId !== 'string') {
		return res.json({
			status: 'Error',
			error: 'Invalid skin Id',
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

		await User.findOneAndUpdate({ _id }, { $set: { skinId } });
		res.json({ status: 'ok' });
	} catch (error) {
		res.json({ status: 'error', error: 'skinId should be a number' });
	}
};

module.exports = { ChangeBonuses, ChangeSkinId };
