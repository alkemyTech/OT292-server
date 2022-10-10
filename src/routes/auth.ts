import express from 'express';
import authController from '../controllers/auth';
import authValidation from '../validations/auth.validation';
import registerUserValidator from '../validations/registerUser.validator';
import {authMe} from '../controllers/auth';
import validateToken from '../middlewares/authenticateToken';

const router : express.Router = express.Router();

router.post('/login', authValidation, authController.login);
router.post('/register', registerUserValidator, authController.registerUser);
router.get('/me',validateToken,authMe);

export default router;
