import express from 'express';

import usersController from '../../controllers/users.js';

const router = express.Router();

router.get('/login', usersController.getLoginForm);

router.post('/login', usersController.postLoginForm);

export default router;
