//ТУТ ОПИСЫВАЕМ ФУНКЦИИ ДЛЯ РЕГСИТАРИЦИ АВТОРИЗАЦИИ И ТД
const User = require('./models/Users');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('./config');
const axios = require('axios');

async function validateHuman(captchaToken) {
	const secret = process.env.RECAPTCHA_SECRET_KEY; // секртеный ключ сайта в env
	console.log(captchaToken, secret);
	const resonse = await axios.post(
		`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaToken}`,
	);
	return resonse.data.success;
}

const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles,
	};
	return jwt.sign(payload, secret, { expiresIn: '24h' });
	//генерирует JWT токен, первый параметр полезная информация(данные пользователя к примеру), второй - секртеный ключ, третий - длительность жизни токена
};
class authController {
	async registration(req, res) {
		try {
			const { username, password, captchaToken } = req.body; // вернет то что отправил нам пользователь
			const candidate = await User.findOne({ username }); //функция findOne возвращает значение если оно совпадает с уловием
			const errors = validationResult(req); // Фнкция принимает Request чтобы проверить данные на валидность
			const successCaptcha = await validateHuman(captchaToken);

			if (successCaptcha) {
				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() }); //Дрпопает ошибку если данные не прошли проверку на валидность
				}

				if (candidate) {
					return res.status(400).json({
						message: 'Такой пользователь уже существует!',
						code: 400,
					});
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
				return res.json({
					message: 'Пользователь успешно зарегестрирован!',
					code: 200,
				});
			} else {
				res.status(400);
			}
		} catch (e) {
			console.log(e);
		}
	}
	async login(req, res) {
		try {
			const { username, password, captchaToken } = req.body;
			const user = await User.findOne({ username });
			const successCaptcha = await validateHuman(captchaToken);
			if (successCaptcha) {
				if (!user) {
					return res.status(400).json({
						message: `Пользователь с именем ${username} не найден`,
					});
				}

				const validPassword = bcrypt.compareSync(
					password,
					user.password,
				);
				if (!validPassword) {
					return res.status(400).json({
						message: 'Неверный пароль',
					});
				}

				const token = generateAccessToken(user._id, user.roles);
				return res.json({
					user,
					token,
					message: 'Успешный вход',
				});
			} else {
				return res.status(400);
			}
		} catch (e) {
			throw e;
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
