import express from 'express';

import usersController from '../../controllers/users.js';

const router = express.Router();

router.get('/login', usersController.getLoginForm);

router.post('/login', usersController.postLoginForm);

router.get(/admin/, usersController.checkAuth);

export default router;
