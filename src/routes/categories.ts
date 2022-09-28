import {
  Router,
} from 'express';
import { remove } from '../controllers/categories';
import { putCategory } from '../controllers/categories';
import { deleteValidator, updateValidator } from '../validations/category.validation';
import { getDetails } from '../controllers/categories';
import { getDetailsValidator } from '../validations/category.validation';
import verifyAdmin from '../middleware/verifyAdmin';
import verifyToken from '../middleware/auth';

const router = Router();

router.put('/:id', verifyToken, verifyAdmin, updateValidator, putCategory);
router.get('/:id', verifyToken, verifyAdmin, getDetailsValidator, getDetails);
router.delete('/:id', verifyToken, verifyAdmin, deleteValidator, remove);

export default router;
