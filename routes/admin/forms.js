import express from 'express';

import adminFormsController from '../../controllers/admin/forms.js';
import checkAuth from '../../middlewares/is_auth.js';

const router = express.Router();

router.get('/admin/add-group-form', checkAuth, adminFormsController.getAddGroupForm);

router.get('/:group/admin/update-group-form', checkAuth, adminFormsController.getUpdateGroupForm);

router.get('/admin/add-coin-form', checkAuth, adminFormsController.getAddCoinForm);

router.get('/:group/:coin/admin/update-coin-form', checkAuth, adminFormsController.getUpdateCoinForm);

router.get('/:group/:coin/admin/add-resource-form', checkAuth, adminFormsController.getAddResourceForm);

router.get('/:group/:coin/:resource/admin/update-resource-form', checkAuth, adminFormsController.getUpdateResourceForm);

export default router;