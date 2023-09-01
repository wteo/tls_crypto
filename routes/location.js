import express from 'express';

import locationController from '../controllers/location.js';

const router = express.Router();

router.get('/:location', locationController.getSelectedLocation)

export default router;