import express from 'express';
const router = express.Router();

import postRoutes from './postRoutes.js';
import {registerUser, loginUser, userProfile, logout} from '../controllers/authController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/posts', postRoutes);
router.get('/profile', userProfile);

export default router;