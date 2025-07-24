import express from 'express';
import multer from 'multer';        // for image uploads

// define path for file uploads
const uploadMiddleware = multer({ dest: 'uploads/' });

const router = express.Router();

import { getPosts, createPost } from '../controllers/postController.js';

router.get('/', getPosts);
router.post('/', uploadMiddleware.single('file'), createPost);

export default router;