import express from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validateUser, validateLogin } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateUser, register);
router.post('/login', validateLogin, login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
