import express from 'express';

import locationsController from '../controllers/locations.js';

const router = express.Router();

router.get('/:region/:location', locationsController.getSelectedLocation);

router.post('/:region/:location/admin/delete', locationsController.deleteAmenity);

router.post('/:region/:location/admin/submit-amenity-form', locationsController.addAmenity);

router.post('/:region/:location/:amenity/admin/update', locationsController.updateAmenity);

export default router;
