import express from 'express';

import authController from '../controllers/auth.js';

const router = express.Router();

router.get('/register', authController.getRegisterForm);

router.post('/register', authController.postRegisterForm);

router.get('/login', authController.getLoginForm);

router.post('/login', authController.postLoginForm);

router.post('/logout', authController.postLogout);

export default router;
