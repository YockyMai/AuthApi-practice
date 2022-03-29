const { Schema, model } = require('mongoose');

const Notes = new Schema({
	author: { type: String, required: true },
	title: { type: String },
	noteText: { type: String },
	color: { type: String, default: '#929292' },
	isPublic: { type: Boolean, default: false },
});

module.exports = model('Notes', Notes);
