const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise; //to use ES6 promises
mongoose.connect('mongodb://localhost/flyers', {
	keepAlive: true,
	useNewUrlParser: true
});

module.exports.User = require('./user');
module.exports.Image = require('./upload');
//module.exports.pDF = require('./pdf');
