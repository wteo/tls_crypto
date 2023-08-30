import express from 'express';

import regionsController from '../controllers/regions.js';

const router = express.Router();

router.get('/location', regionsController.getSelectedLocation)

export default router;