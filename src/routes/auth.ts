import express from 'express';
import authController from '../controllers/auth';
import userController from '../controllers/users';
import authValidation from '../validations/auth.validation';
import userValidation from '../validations/user.validation';
import validateToken from '../middlewares/authenticateToken';
import uploadMiddleware from '../services/multer';

const router : express.Router = express.Router();

router.post('/login', authValidation, authController.login);
router.post('/register', uploadMiddleware.single('image'), userValidation.create, userController.createUser);
router.get('/me', validateToken, authController.authMe);

export default router;
