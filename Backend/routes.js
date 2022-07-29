const express = require('express'),
	router = express.Router();

const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const gameRoutes = require('./routes/gameRoutes');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/game', gameRoutes);

module.exports = router;
