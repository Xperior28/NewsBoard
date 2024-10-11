
import express from 'express';
const router = express.Router();

import {registerUser, loginUser, testAuth} from '../controllers/authControllers.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/test', testAuth);


export default router;