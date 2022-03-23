//ТУТ ОПИСЫВАЕМ ФУНКЦИИ ДЛЯ РЕГСИТАРИЦИ АВТОРИЗАЦИИ И ТД
class authController {
	async registration(req, res) {
		try {
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
			res.json('working');
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new authController();
