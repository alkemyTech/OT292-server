import {
  Router,
} from 'express';
import { list, remove, getDetails } from '../controllers/categories';
import { deleteValidator, listValidator, getDetailsValidator } from '../validations/category.validation';

import verifyAdmin from '../middleware/verifyAdmin';
import verifyToken from '../middleware/auth';

const router = Router();

router.get('/:id', verifyToken, verifyAdmin, getDetailsValidator, getDetails);
router.delete('/:id', verifyToken, verifyAdmin, deleteValidator, remove);
router.get('/', verifyToken, verifyAdmin, listValidator, list);

export default router;
