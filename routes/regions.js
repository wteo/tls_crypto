import express from 'express';

import regionsController from '../controllers/regions.js';

const router = express.Router();

router.get('/regions', regionsController.getRegions)

router.get('/region', regionsController.getSelectedRegion)

export default router;