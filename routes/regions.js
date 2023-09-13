import express from 'express';

import regionsController from '../controllers/regions.js';

export default (db) => {
    const router = express.Router();

    router.use('/', regionsController.getStates);

    router.get('/results', regionsController.getSearchResults);

    router.get('/', regionsController.getRegions);

    router.get('/:region', regionsController.getSelectedRegion);

    return router;
};
