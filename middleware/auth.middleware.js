const jwt = require('jsonwebtoken');
const config = require('../config');

function jwtAuth(req, res, next) {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
	} catch (e) {
		return;
	}
}

module.exports = jwtAuth; //TODO: Сделать аунтефикацию с помощью jwt токена!
