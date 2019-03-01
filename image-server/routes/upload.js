const express = require('express');
const router = express.Router();
// const { signup, signin } = require('../handlers/auth');

// ROUTE: /api/upload
router.post('/newImage', () => {
	console.log('hit upload post route');
});

module.exports = router;
