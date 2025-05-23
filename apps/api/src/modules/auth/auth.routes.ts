import { Router } from 'express';
import { signUpController } from './auth.controller';

const router = Router();

// POST /api/auth/signup (or /api/customers/signup - adjust as needed)
router.post('/signup', signUpController);

export default router; 