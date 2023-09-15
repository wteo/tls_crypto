import express from 'express';

import regionsController from '../controllers/regions.js';

export default (db) => {
    const router = express.Router();

    router.use('/', regionsController(db).getStates);
    router.get('/results', regionsController(db).getSearchResults);
    router.get('/', regionsController(db).getRegions);
    router.get('/:region', regionsController(db).getSelectedRegion);

    return router;
};
