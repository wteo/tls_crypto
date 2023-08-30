import express from 'express';

import regionsController from '../controllers/regions.js';

const router = express.Router();

router.get('/regions', regionsController.getRegions)

export default router;