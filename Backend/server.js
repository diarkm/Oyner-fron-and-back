const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const { username, password, cluster, dbname } = require('./databaseConnection');

mongoose
	.connect(
		`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.catch((err) => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind('Connection error'));
db.once('open', () => {
	console.log('Database connected successfully');
});

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);

const router = require('./routes');

//Router connection
app.use('/api', router);

app.listen(9999, () => {
	console.log('Server up at 9999');
});

module.exports = app;
