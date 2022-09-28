import express from 'express';
import authController from '../controllers/auth';
import authValidation from '../validations/auth.validation';
import registerUserValidator from '../validations/registerUser.validator';

const router : express.Router = express.Router();

router.post('/login', authValidation, authController.login);
router.post('/register', registerUserValidator, authController.registerUser);

export default router;
