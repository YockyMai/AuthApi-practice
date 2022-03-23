const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRoutes');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()); //Сервер парсит в JSON формат
app.use('/auth', authRouter);

const start = async () => {
	try {
		await mongoose.connect(
			'mongodb+srv://YockyMai:Dfkthf15102003@clubhouse.bbou8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
		);
		app.listen(PORT, () => {
			console.log(`Server runned on ${PORT} port`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();
