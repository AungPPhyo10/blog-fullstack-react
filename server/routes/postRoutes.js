import express from 'express';
import multer from 'multer';        // for image uploads

// define path for file uploads
const uploadMiddleware = multer({ dest: 'uploads/' });

const router = express.Router();

import { getPosts, getSinglePost, createPost } from '../controllers/postController.js';

router.get('/', getPosts);
router.get('/:id', getSinglePost);
router.post('/', uploadMiddleware.single('file'), createPost);

export default router;