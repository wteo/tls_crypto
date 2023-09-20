import express from 'express';

import locationsController from '../controllers/locations.js';

const router = express.Router();

router.get('/:region/:location', locationsController.getSelectedLocation);

router.get('/:region/:location/admin', locationsController.getAdminPage);

export default router;
