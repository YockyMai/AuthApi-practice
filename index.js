const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRoutes');
const corsMiddleware = require('./middleware/cors.middleware');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(corsMiddleware);
app.use(express.json()); //Сервер парсит в JSON формат
app.use('/auth', authRouter);
app.use('/', (req, res) => {
	res.json('API is ready to go :D');
});

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
