import {
  Router,
} from 'express';
import { getDetails } from '../controllers/categories';
import { getDetailsValidator } from '../validations/category.validation';
import verifyAdmin from '../middleware/verifyAdmin';
import verifyToken from '../middleware/auth';

const router = Router();

router.get('/:id', verifyToken, verifyAdmin, getDetailsValidator, getDetails);

export default router;
