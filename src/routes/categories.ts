import {
  Router,
} from 'express';
import { remove,create } from '../controllers/categories';
import { deleteValidator } from '../validations/category.validation';
import {createValidator} from '../validations/category.validation';
import { getDetails } from '../controllers/categories';
import { getDetailsValidator } from '../validations/category.validation';
import verifyAdmin from '../middleware/verifyAdmin';
import verifyToken from '../middleware/auth';

const router = Router();

router.get('/:id', verifyToken, verifyAdmin, getDetailsValidator, getDetails);
router.delete('/:id', verifyToken, verifyAdmin, deleteValidator, remove);
router.post('/',verifyToken,verifyAdmin,createValidator,create);

export default router;
