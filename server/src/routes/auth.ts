import { Router } from 'express';
import * as authController from '../controllers/auth';
import { authenticateToken } from '../middleware/auth';
import { validateInput } from '../middleware/inputValidation';

const router = Router();

router.post('/register', validateInput, authController.register);
router.post('/login', validateInput, authController.login);
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/profile', authenticateToken, validateInput, authController.updateProfile);

export default router;
