import express, { NextFunction, Request, Response } from 'express';
import { deleteUser } from '../controllers/users';

const router = express.Router();

/* GET users listing. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('respond with a resource');
});

router.delete('/:id', deleteUser)

export default router;
