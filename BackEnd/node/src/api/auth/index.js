const { Router } = require('express');
const router = new Router();
const controller = require('./controller');

router.post('/login', controller.login);

router.post('/register', controller.register);

router.post('/forgot-password', controller.forgotPassword);

router.post('/reset-password', controller.resetPassword);

module.exports = router;