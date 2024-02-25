import { Router } from 'express';
import * as UserController from '../controllers/UserController.js';
import { checkAuth, handleValidationErrors } from '../utils/index.js';
import { loginValidation, registerValidation } from '../validations/auth.js';

const router = Router();

router.get('/me', checkAuth, UserController.getMe);
router.post('/login', loginValidation, handleValidationErrors, UserController.login);
router.post('/register', registerValidation, handleValidationErrors, UserController.register);
export default router;
