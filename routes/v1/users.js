const express = require('express')
const router = express.Router();
const userController = require('../../controllers/user');
const Auth = require('../../middlewares/auth');
const UserValidate = require('../../middlewares/validate/user');

router.post('/register', UserValidate.register, userController.register);
router.post('/login', UserValidate.login, userController.login);
router.get('/me', Auth.login, userController.me);
router.get('/', Auth.login, userController.getUsers);
router.get('/:userId', Auth.login, userController.getUser);
router.patch('/:userId/score', Auth.login, Auth.isTeacher, userController.updateScore);
router.post('/logout', userController.logout);

module.exports = router;