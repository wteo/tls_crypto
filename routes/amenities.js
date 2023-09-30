import express from 'express';

import amenitiesController from '../controllers/amenities.js';

const router = express.Router();

router.get('/:region/:location/:amenity', amenitiesController.getSelectedAmenity)

export default router;