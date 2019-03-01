const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
	url: {
		type: String,
		required: true
	}
});

//check for auth user before allowing save; middleware?

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
