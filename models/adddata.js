const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	data: {
		type: Object,
		required: true,
	},
});

module.exports = mongoose.model('TodoTask', todoTaskSchema);
