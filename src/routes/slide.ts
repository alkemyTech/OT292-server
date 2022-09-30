import { Router } from 'express';
import VerifyAdmin from '../middleware/verifyAdmin';
import validateToken from '../middleware/auth';
import { slidesGetAll } from '../controllers/slides';

const router = Router();

router.get('/', validateToken, VerifyAdmin, slidesGetAll);

export default router;
