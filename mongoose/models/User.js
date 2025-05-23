const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		lowercase: true,
	},
	age: {
		type: Number,
		min: 0,
	},
	isActive: {
		type: Boolean,
		default: true,
	}
}, {
	timestamps: true,
});

module.exports = mongoose.model('User', userSchema);