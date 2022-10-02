import express from 'express';
import authController from '../controllers/auth';
import authValidation from '../validations/auth.validation';
import {authMe} from '../controllers/auth';
import validateToken from '../middleware/auth';

const router : express.Router = express.Router();

router.post('/login', authValidation, authController.login);
router.get('/me',validateToken,authMe);

export default router;
