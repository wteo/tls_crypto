import express from 'express';

import locationsController from '../controllers/locations.js';

const router = express.Router();

router.get('/:region/:location', locationsController.getSelectedLocation);

export default router;