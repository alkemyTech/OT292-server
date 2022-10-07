import { Router } from 'express';
import {
  slidesGetAll, slideDetail, slideDelete, slideCreate,slideUpdate
} from '../controllers/slides';
import { validateCreate, validateRead, validateUpdate } from '../validations/slideValidator';
import verifyAdmin from '../middleware/verifyAdmin';
import validateToken from '../middleware/auth';
import uploadMiddleware from '../services/multer';

const router = Router();

router.get('/', validateToken, verifyAdmin, slidesGetAll);
router.put('/:id',validateToken,verifyAdmin,validateUpdate,slideUpdate);
router.delete('/:id', validateToken, verifyAdmin, validateRead, slideDelete);
router.post('/', validateToken, verifyAdmin, uploadMiddleware.single('image'), validateCreate, slideCreate);
router.get('/:id', validateToken, verifyAdmin, validateRead, slideDetail);

export default router;
