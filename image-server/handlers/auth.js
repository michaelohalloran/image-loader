const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
	try {
		//find user
		let user = await db.User.findOne({
			email: req.body.email
		});
		let { id, username } = user;
		console.log('sign in id, un: ', id, username);
		//check that pw matches
		let isMatch = user.comparePassword(req.body.password, user.password);
		//if so, sign him in with the jwt token
		if (isMatch) {
			console.log('isMatch true');
			let token = jwt.sign(
				{
					id,
					username
				},
				process.env.SECRET_KEY
			); //sign token with our secret key
			return res.status(200).json({
				id,
				username,
				token
			});
		} else {
			//else pass this to our errorHandler
			return next({
				status: 400,
				message: 'Invalid Email/Password'
			});
		}
	} catch (e) {
		console.log('hit catch err: ', e);
		return next({ status: 400, message: 'Invalid Email/Password' });
	}
};

exports.signup = async function(req, res, next) {
	try {
		//create user
		let user = db.User.create(req.body); //req.body is data coming from frontend form
		let { id, username } = user;
		console.log('id, name: ', id, username);
		//create token
		let token = jwt.sign(
			{
				id,
				username
			},
			process.env.SECRET_KEY
		);
		return res.status(200).json({
			id,
			username,
			token
		});
	} catch (err) {
		//if validation fails
		if (err.code === 11000) {
			//reply with username/email already taken
			err.message = 'Sorry, that username and/or email is already taken.';
		}
		//or generic 400
		return next({
			status: 400,
			message: err.message
		});
	}
};
