
import express from 'express';
const router = express.Router();

import { generateNews, generateKeyNews, extractKeywords } from '../controllers/newsControllers.js';

router.get('/generate', generateNews);
router.post('/generate', generateKeyNews);
router.post('/extract', extractKeywords);

export default router;