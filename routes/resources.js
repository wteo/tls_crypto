import express from 'express';

import resourcesController from '../controllers/resources.js';

const router = express.Router();

router.get('/:group/:coin/:resource', resourcesController.getSelectedResource);

export default router;