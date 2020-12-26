const express = require('express')
const router = express.Router();
const UserController = require('../../controllers/user');
const Auth = require('../../middlewares/auth');
const UserValidate = require('../../middlewares/validate/user');

router.post('/register', UserValidate.register, UserController.register);
router.post('/login', UserValidate.login, UserController.login);
router.get('/me', Auth.login, UserController.me);
router.get('/', Auth.login, UserController.getUsers);
router.get('/:userId', Auth.login, UserController.getUser);
router.patch('/:userId/score', Auth.login, Auth.isTeacher, UserController.updateScore);
router.post('/logout', UserController.logout);

module.exports = router;