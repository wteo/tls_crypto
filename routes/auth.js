import express from 'express';

import authController from '../controllers/auth.js';
import CSRFProtection from '../middlewares/csrf_protection.js';

const router = express.Router();

router.get('/register', authController.getRegisterForm);

router.post('/register', CSRFProtection.verifyCSRFToken, authController.postRegisterForm);

router.get('/login', authController.getLoginForm);

router.post('/login', CSRFProtection.verifyCSRFToken, authController.postLoginForm);

router.post('/logout', CSRFProtection.verifyCSRFToken, authController.postLogout);

export default router;
