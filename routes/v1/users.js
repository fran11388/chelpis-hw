const express = require('express')
const router = express.Router();
const userController = require('../../controllers/user');
const AuthMiddleware = require('../../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', AuthMiddleware.login, userController.me);
router.get('/', AuthMiddleware.login, userController.getUsers);
router.get('/:userId', AuthMiddleware.login, userController.getUser);
router.patch('/:userId/score', AuthMiddleware.login, AuthMiddleware.isTeacher, userController.updateScore);
router.post('/logout', userController.logout);

module.exports = router