import express, { NextFunction, Request, Response } from 'express';
import { deleteUser } from '../controllers/users';

import verifyAdmin from '../middleware/verifyAdmin';
import verifyToken from '../middleware/auth';
import { getAll } from '../controllers/user';
const router = express.Router();

/* GET users listing. */
router.get('/', verifyToken, verifyAdmin, getAll);

router.delete('/:id', deleteUser)

export default router;
