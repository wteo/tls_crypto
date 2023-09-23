import express from 'express';

import adminPagesController from '../../controllers/admin/pages.js';

const router = express.Router();

router.get('/admin', adminPagesController.getMainPage); 

router.get('/:region/admin', adminPagesController.getRegionPage);

export default router;