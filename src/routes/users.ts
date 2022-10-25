import express from 'express';
import controller from '../controllers/users';
import verifyAdmin from '../middlewares/verifyAdmin';
import validateToken from '../middlewares/authenticateToken';
import verifyOwnership from '../middlewares/verifyOwnership';
import validator from '../validations/user.validation';
import uploadMiddleware from '../services/multer';

const router = express.Router();

/* GET users listing. */
router.get('/', validateToken, verifyAdmin, controller.getAll);
router.patch('/:id', uploadMiddleware.single('image'), validateToken, verifyOwnership, controller.updateUser);
router.delete('/:id', controller.deleteUser);

export default router;
