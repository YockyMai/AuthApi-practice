const { Schema, model } = require('mongoose');

const Role = new Schema({
	value: { type: String, unique: true, default: 'USER' }, //тут мы храним сами роли по типу админа и модератора!
	// default указывает дефолтное значение которые будет переданно!
});

module.exports = model('Role', Role); //первый параметр название схемы, второй сама схема по которой должнен создатся User(описана выше)
