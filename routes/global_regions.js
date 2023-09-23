import express from 'express';

import globalRegionController from '../controllers/global_regions.js';

const router = express.Router();

router.use('/', globalRegionController.getStates);

router.get('/', globalRegionController.getRegions);

router.get('/results', globalRegionController.fetchSearchResults);

router.get('/:region', globalRegionController.getSelectedRegion);


export default router;
