import express from 'express';

import usersController from '../../controllers/users.js';

const router = express.Router();

router.get('/register', usersController.getRegisterForm);

router.post('/register', usersController.postRegisterForm);

router.get('/login', usersController.getLoginForm);

router.post('/login', usersController.postLoginForm);

router.get(/admin/, usersController.checkAuth);

router.post('/logout', usersController.postLogout);

export default router;
