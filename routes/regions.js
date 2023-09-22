import express from 'express';

import regionsController from '../controllers/regions.js';

const router = express.Router();

router.use('/', regionsController.getStates);

router.get('/admin', regionsController.getAdminMainPage);

router.get('/admin/region-form', regionsController.getRegionForm);

router.post('/admin/submit-region-form', regionsController.addRegion);

router.get('/:region/admin', regionsController.getAdminRegionPage);

router.post('/:region/admin/delete', regionsController.deleteLocation);

router.get('/admin/add-location-form', regionsController.getAddLocationForm);

router.post('/admin/submit-location-form', regionsController.addLocation);

router.get('/:region/:location/admin/update-location-form', regionsController.getUpdateLocationForm);

router.post('/:region/:location/admin/update', regionsController.updateLocation);

router.get('/results', regionsController.getSearchResults);

router.get('/', regionsController.getRegions);

router.get('/:region', regionsController.getSelectedRegion);

export default router;
