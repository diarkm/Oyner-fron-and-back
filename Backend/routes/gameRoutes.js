const express = require('express'),
	router = express.Router();

const verifyToken = require('./verifyToken');

const { ChangeBonuses, ChangeSkinId } = require('../controllers/gameFunctions');

router.post('/change-bonus', verifyToken, ChangeBonuses);
router.post('/change-skin', verifyToken, ChangeSkinId);

module.exports = router;
