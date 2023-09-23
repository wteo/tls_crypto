import express from 'express';

import adminFormsController from '../../controllers/admin/forms.js';

const router = express.Router();

router.get('/admin/add-region-form', adminFormsController.getAddRegionForm);

router.get('/:region/admin/update-region-form', adminFormsController.getUpdateRegionForm);

router.get('/admin/add-location-form', adminFormsController.getAddLocationForm);

router.get('/:region/:location/admin/update-location-form', adminFormsController.getUpdateLocationForm);

export default router;