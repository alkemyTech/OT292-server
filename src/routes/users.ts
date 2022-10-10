import express from 'express';
import { deleteUser, updateUser } from '../controllers/users';

import verifyAdmin from '../middlewares/verifyAdmin';
import valdiateToken from '../middlewares/authenticateToken';
import { getAll } from '../controllers/user';
import verifyOwnership from '../middlewares/verifyOwnership';
import userValidation from '../validations/user.validation';

const router = express.Router();

/* GET users listing. */
router.get('/', valdiateToken, verifyAdmin, getAll);

router.delete('/:id', deleteUser);
router.patch('/:id', valdiateToken, verifyOwnership, userValidation, updateUser);

export default router;
