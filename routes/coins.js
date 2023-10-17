import express from 'express';

import coinsController from '../controllers/coins.js';
import CSRFProtection from '../middlewares/csrf_protection.js';

const router = express.Router();

router.get('/:group/:coin', coinsController.getSelectedCoin);

router.post('/:group/:coin/admin/delete', CSRFProtection.verifyCSRFToken, coinsController.deleteResource);

router.post('/:group/:coin/admin/submit-resource-form', CSRFProtection.verifyCSRFToken, coinsController.addResource);

router.post('/:group/:coin/:resourceId/admin/update', CSRFProtection.verifyCSRFToken, coinsController.updateResource);

export default router;
