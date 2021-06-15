var express = require('express');
var path = require('path');
const { allClasses } = require('./constants');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const TodoTask = require('./models/adddata');
// const main = require('./fullcalender/main')

dotenv.config();

var app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/static'));

mongoose.connect(
	process.env.DB_CONNECT,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	},
	() => {
		console.log('Connected to db!');
	}
);

var tasks = [];
app.get('/', function (req, res) {
	TodoTask.find({}, (err, tasks) => {
		// console.log(tasks);
		res.render('bookclass', { todoTasks: tasks });
	});
});

app.get('/addclass', function (req, res) {
	TodoTask.find({}, (err, tasks) => {
		res.render('addclass', { todoTasks: tasks });
	});
});

app.post('/addclass', async (req, res) => {
	// console.log(req.body);
	const todoTask = new TodoTask({
		data: req.body.request_data,
	});
	try {
		await todoTask.save();
		res.redirect('/addclass');
	} catch (err) {
		console.log(err);
		res.redirect('/addclass');
	}
});

PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
