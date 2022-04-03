const Router = require('express');
const { check } = require('express-validator');
const authController = require('./authController'); //функции, импортируем для декомпозиции
const { body } = require('express-validator');
const authMiddleware = require('./middleware/auth.middleware');

const router = new Router();

router.post(
	'/registration',
	body('username').notEmpty(),
	body('password').isLength({ min: 3, max: 100 }),
	authController.registration,
);
router.post('/login', authController.login);
router.post('/users', authController.getUsers);
router.get('/auth', authMiddleware, authController.auth);

module.exports = router;
