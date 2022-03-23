const { Schema, model } = require('mongoose');

const User = new Schema({
	//описывает как пользователь будет хранится в базе данных
	username: { type: String, unique: true, required: true }, //unique - уникальный, required - обязательное поле
	password: { type: String, required: true },
	roles: [
		//роли пользователя, может быть несколько
		{
			type: String,
			ref: 'Role', //ссылка на другую сущность role
		},
	],
});

module.exports = model('User', User); //первый параметр название схемы, второй сама схема по которой должнен создатся User(описана выше)
