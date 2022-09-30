import express from 'express';
import { deleteUser, updateUser } from '../controllers/users';

import verifyAdmin from '../middleware/verifyAdmin';
import verifyToken from '../middleware/auth';
import { getAll } from '../controllers/user';
import verifyOwnership from '../middleware/verifyOwnership';
import userValidation from '../validations/user.validation';

const router = express.Router();

/* GET users listing. */
router.get('/', verifyToken, verifyAdmin, getAll);

router.delete('/:id', deleteUser);
router.patch('/:id', verifyToken, verifyOwnership, userValidation, updateUser);

export default router;
