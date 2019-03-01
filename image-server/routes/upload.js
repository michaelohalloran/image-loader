const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../models');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		//fieldname is imgUpload, from "name" prop on input in React FE
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({ storage }); //multer will send images to a static folder we are making here

// ROUTE: /api/upload/newImage
router.post('/newImage', upload.single('newUpload'), (req, res, next) => {
	console.log('hit upload post route, req: ', req.body);
	console.log('req.file: ', req.file);

	//Traversy 20:00ff:
	//upload(req, res, (err) => {
	// if(err) {
	// 	console.log('upload err: ', err);
	// } else {
	// 	console.log(req.file);
	// }
	// })

	try {
		//use req.body.url?
		let newImg = db.Image.create(req.body);
		//USE .then here?
		let { url } = newImg;
		console.log('newImg ', newImg);
		return res.status(200).json({
			url
		});
	} catch (e) {
		console.log('img error: ', e);
	}
});

//HTTP Pie test:
// http POST localhost:5000/api/upload/newImage url="https://upload.wikimedia.org/wikipedia/commons/6/6e/Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg"

//api/upload/getImgs
router.get('/getImgs', (req, res, next) => {
	//get all imgs
	//db.Image.find({})
	//.then(imgs => res.json(imgs))
	//return them
});

module.exports = router;
