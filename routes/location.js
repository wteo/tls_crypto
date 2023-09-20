import express from 'express';

import locationsController from '../controllers/locations.js';

const router = express.Router();

router.get('/:region/:location', locationsController.getSelectedLocation);

router.get('/:region/:location/admin', locationsController.getAdminPage);

router.post('/:region/:location/admin/delete', locationsController.deleteAmenity);

export default router;
