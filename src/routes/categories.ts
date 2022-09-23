import {
  Router,
} from 'express';
import { remove } from '../controllers/categories';
import { deleteValidator } from '../validations/category.validation';
import verifyAdmin from '../middleware/verifyAdmin';
import verifyToken from '../middleware/auth';

const router = Router();

router.delete('/:id', verifyToken, verifyAdmin, deleteValidator, remove);

export default router;
