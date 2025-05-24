import { Router } from 'express';
import { signUpController, loginAdminController } from './auth.controller';

const router = Router();

// POST /api/auth/signup (or /api/customers/signup - adjust as needed)
router.post('/signup', signUpController);

// POST /api/auth/admin/login  <-- New route for admin login
router.post('/admin/login', loginAdminController);

export default router; 