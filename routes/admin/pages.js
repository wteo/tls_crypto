import express from 'express';

import adminPagesController from '../../controllers/admin/pages.js';
import checkAuth from '../../controllers/middlewares/is_auth.js';

const router = express.Router();

router.get('/admin', checkAuth, adminPagesController.getMainPage); 

router.get('/:group/admin', checkAuth, adminPagesController.getGroupPage);

router.get('/:group/:coin/admin', checkAuth, adminPagesController.getCoinPage);

export default router;