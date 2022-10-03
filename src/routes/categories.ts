import { Router } from 'express';
import {
  create, getDetails, putCategory, list, remove,
} from '../controllers/categories';
import {
  deleteValidator, createValidator, getDetailsValidator,
  listValidator, updateValidator,
} from '../validations/category.validation';

import verifyAdmin from '../middleware/verifyAdmin';
import verifyToken from '../middleware/auth';

const router = Router();

router.put('/:id', verifyToken, verifyAdmin, updateValidator, putCategory);
router.get('/:id', verifyToken, verifyAdmin, getDetailsValidator, getDetails);
router.delete('/:id', verifyToken, verifyAdmin, deleteValidator, remove);
router.post('/', verifyToken, verifyAdmin, createValidator, create);
router.get('/', verifyToken, verifyAdmin, listValidator, list);

export default router;
