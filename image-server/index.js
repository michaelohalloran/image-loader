require('dotenv').config();
const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

//ROUTES

app.use((req, res, next) => {
	let err = new Error('Not found');
	err.status = 404;
	next(err);
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
