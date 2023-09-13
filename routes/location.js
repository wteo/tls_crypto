import express from 'express';

import locationsController from '../controllers/locations.js';

export default (db) => {
    const router = express.Router();

    router.get('/:region/:location', locationsController(db).getSelectedLocation);

    return router;
};
