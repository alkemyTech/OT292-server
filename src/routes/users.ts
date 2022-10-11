import express from 'express';
import controller from '../controllers/users';
import verifyAdmin from '../middlewares/verifyAdmin';
import validateToken from '../middlewares/authenticateToken';
import verifyOwnership from '../middlewares/verifyOwnership';
import userValidation from '../validations/user.validation';

const router = express.Router();

/* GET users listing. */
router.get('/', validateToken, verifyAdmin, controller.getAll);
router.delete('/:id', controller.deleteUser);
router.patch('/:id', validateToken, verifyOwnership, userValidation, controller.updateUser);

export default router;
