//ТУТ ОПИСЫВАЕМ ФУНКЦИИ ДЛЯ РЕГСИТАРИЦИ АВТОРИЗАЦИИ И ТД
const User = require('./models/Users');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
class authController {
	async registration(req, res) {
		try {
			const { username, password } = req.body; // вернет то что отправил нам пользователь
			const candidate = await User.findOne(username); //функция findOne возвращает значение если оно совпадает с уловием
			if (candidate) {
				return res
					.status(400)
					.json('Такой пользователь уже существует!');
			}
			const hashPassword = bcrypt.hashSync('B4c0//', password);
			console.log(hashPassword);
			const newUser = new User({
				password: hashPassword,
				username: username,
				roles: 'User',
			});
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
			// const UserRole = new Role();
			// const AdminRole = new Role({ value: 'ADMIN' });
			// await UserRole.save();
			// await AdminRole.save();
			res.json('working');
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new authController();
