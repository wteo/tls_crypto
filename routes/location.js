import express from 'express';

import locationsController from '../controllers/locations.js';

const router = express.Router();

router.get('/:region/:location', locationsController.getSelectedLocation);

router.get('/:region/:location/admin', locationsController.getAdminPage);

router.post('/:region/:location/admin/delete', locationsController.deleteAmenity);

router.get('/:region/:location/admin/add-amenity-form', locationsController.getAddAmenityForm);

router.post('/:region/:location/admin/submit-amenity-form', locationsController.addAmenity);

export default router;
