//ТУТ ОПИСЫВАЕМ ФУНКЦИИ ДЛЯ РЕГСИТАРИЦИ АВТОРИЗАЦИИ И ТД
const User = require('./models/Users');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
class authController {
	async registration(req, res) {
		try {
			const { username, password } = req.body; // вернет то что отправил нам пользователь
			const candidate = await User.findOne({ username }); //функция findOne возвращает значение если оно совпадает с уловием

			const errors = validationResult(req); // Фнкция принимает Request чтобы проверить данные на валидность
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() }); //Дрпопает ошибку если данные не прошли проверку на валидность
			}

			if (candidate) {
				return res
					.status(400)
					.json('Такой пользователь уже существует!');
			}

			const salt = bcrypt.genSaltSync(10);
			const hashPassword = bcrypt.hashSync(password, salt);

			const userRole = await Role.findOne({ value: 'USER' }); // вытаскиваем роль из ROlE
			const newUser = new User({
				username: username,
				password: hashPassword,
				roles: [userRole.value],
			});
			await newUser.save();
			return res.json('Пользователь успешно зарегестрирован!');
		} catch (e) {
			console.log(e);
		}
	}
	async login(req, res) {
		try {
			res.json('login');
		} catch (e) {
			console.log(e);
		}
	}
	async getUsers(req, res) {
		try {
			const ModerRole = new Role({ value: 'MODERATOR' });
			await ModerRole.save();
			res.json('working');
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new authController();
