import express from 'express';

import FAQItemsController from '../controllers/FAQ_items.js';

const router = express.Router();

router.get('/faq', FAQItemsController.getFAQItems);

export default router;