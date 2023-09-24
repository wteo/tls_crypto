import express from 'express';

import adminFormsController from '../../controllers/admin/forms.js';

const router = express.Router();

router.get('/admin/add-region-form', adminFormsController.getAddRegionForm);

router.get('/:region/admin/update-region-form', adminFormsController.getUpdateRegionForm);

router.get('/admin/add-location-form', adminFormsController.getAddLocationForm);

router.get('/:region/:location/admin/update-location-form', adminFormsController.getUpdateLocationForm);

router.get('/:region/:location/admin/add-amenity-form', adminFormsController.getAddAmenityForm);

router.get('/:region/:location/:amenity/admin/update-amenity-form', adminFormsController.getUpdateAmenityForm);

export default router;