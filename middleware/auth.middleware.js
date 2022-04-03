const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			return res.status(400).json('Auth error');
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded;
		console.log(decoded, 'asdasd');
		next();
	} catch (e) {
		console.log(e);
	}
};
