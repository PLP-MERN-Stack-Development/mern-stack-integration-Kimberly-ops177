import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
  deleteComment
} from '../controllers/postController.js';
import { protect, admin } from '../middleware/auth.js';
import { validatePost, validateComment } from '../middleware/validation.js';

const router = express.Router();

// Post routes
router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', protect, validatePost, createPost);
router.put('/:id', protect, validatePost, updatePost);
router.delete('/:id', protect, deletePost);

// Comment routes
router.post('/:id/comments', protect, validateComment, addComment);
router.delete('/:id/comments/:commentId', protect, deleteComment);

export default router;
