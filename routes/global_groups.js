import express from 'express';

import globalGroupsController from '../controllers/global_groups.js';

const router = express.Router();

router.use('/', globalGroupsController.getCategories);

router.get('/', globalGroupsController.getGroups);

router.get('/results', globalGroupsController.fetchSearchResults);

export default router;
