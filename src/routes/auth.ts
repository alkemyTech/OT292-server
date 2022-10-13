import express from 'express';
import authController from '../controllers/auth';
import userController from '../controllers/users';
import authValidation from '../validations/auth.validation';
import registerUserValidator from '../validations/registerUser.validator';
import validateToken from '../middlewares/authenticateToken';

const router : express.Router = express.Router();

router.post('/login', authValidation, authController.login);
router.post('/register', registerUserValidator, userController.createUser);
router.get('/me', validateToken, authController.authMe);

export default router;
