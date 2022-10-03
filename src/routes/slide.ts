import { Router } from 'express';
import {
  slidesGetAll, slideDetail, slideDelete, slideCreate,
} from '../controllers/slides';
import { validateCreate, validateRead } from '../validations/slideValidator';
import verifyAdmin from '../middleware/verifyAdmin';
import validateToken from '../middleware/auth';
import uploadMiddleware from '../services/multer';

const router = Router();

router.get('/', validateToken, verifyAdmin, slidesGetAll);
router.delete('/:id', validateToken, verifyAdmin, validateRead, slideDelete);
router.get('/:id', validateToken, verifyAdmin, validateRead, slideDetail);
router.post('/', validateToken, verifyAdmin, uploadMiddleware.single('image'), validateCreate, slideCreate);

export default router;
