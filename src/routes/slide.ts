import { Router } from 'express';
import { slidesGetAll, slideDetail, slideDelete } from '../controllers/slides';
import { validateRead } from '../validations/slideValidator';
import verifyAdmin from '../middleware/verifyAdmin';
import validateToken from '../middleware/auth';

const router = Router();

router.get('/', validateToken, verifyAdmin, slidesGetAll);
router.delete('/:id', validateToken, verifyAdmin, validateRead, slideDelete);
router.get('/:id', validateToken, verifyAdmin, validateRead, slideDetail);

export default router;
