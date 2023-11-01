import express from 'express';

import groupsController from '../controllers/groups.js';
import CSRFProtection from '../controllers/middlewares/csrf_protection.js';

const router = express.Router();

router.get('/:group', groupsController.fetchGroup);

router.post('/admin/submit-add-group-form', CSRFProtection.verifyCSRFToken, groupsController.addGroup);

router.post('/:group/admin/submit-update-group-form', CSRFProtection.verifyCSRFToken, groupsController.updateGroup);

router.post('/admin/delete-group', CSRFProtection.verifyCSRFToken, groupsController.deleteGroup);

router.post('/admin/submit-add-coin-form', CSRFProtection.verifyCSRFToken, groupsController.addCoin);

router.post('/:group/:coin/admin/update', CSRFProtection.verifyCSRFToken, groupsController.updateCoin);

router.post('/:group/admin/delete', CSRFProtection.verifyCSRFToken, groupsController.deleteCoin);

export default router;
