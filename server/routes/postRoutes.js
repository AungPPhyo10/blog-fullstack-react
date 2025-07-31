import express from 'express';
import multer from 'multer';        // for image uploads

// define path for file uploads
const uploadMiddleware = multer({ dest: 'uploads/' });

const router = express.Router();

import { getPosts, getSinglePost, createPost, updatePost, deletePost } from '../controllers/postController.js';

router.get('/', getPosts);
router.get('/:id', getSinglePost);
router.post('/', uploadMiddleware.single('file'), createPost);
router.put('/:id', uploadMiddleware.single('file'), updatePost);
router.delete('/:id', deletePost);

export default router;