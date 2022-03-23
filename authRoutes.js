const Router = require('express');
const authController = require('./authController'); //функции, импортируем для декомпозиции

const router = new Router();

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.post('/users', authController.getUsers);

module.exports = router;
