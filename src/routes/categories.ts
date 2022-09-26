import { Router } from 'express';
import { remove, getDetails, create } from '../controllers/categories';
import { createValidator, deleteValidator, getDetailsValidator } from '../validations/category.validation';

import verifyAdmin from '../middleware/verifyAdmin';
import verifyToken from '../middleware/auth';

const router = Router();

router.post('/', verifyToken, verifyAdmin, createValidator, create);
router.get('/:id', verifyToken, verifyAdmin, getDetailsValidator, getDetails);
router.delete('/:id', verifyToken, verifyAdmin, deleteValidator, remove);

export default router;
