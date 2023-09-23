import express from 'express';

import regionsController from '../controllers/regions.js';

const router = express.Router();

router.get('/:region', regionsController.fetchRegion);

router.post('/admin/submit-add-region-form', regionsController.addRegion);

router.post('/:region/admin/submit-update-region-form', regionsController.updateRegion);

router.post('/admin/delete-region', regionsController.deleteRegion);

router.post('/admin/submit-add-location-form', regionsController.addLocation);

router.post('/:region/:location/admin/update', regionsController.updateLocation);

router.post('/:region/admin/delete', regionsController.deleteLocation);

export default router;
