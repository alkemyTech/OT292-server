import {Router} from 'express';
import {slidesGetAll, slideDetail, slideDelete} from '../controllers/slides';
import {validateRead} from '../validations/slideValidator';
import VerifyAdmin from '../middleware/verifyAdmin';
import ValidateToken from '../middleware/auth';

const router = Router();

router.get('/', validateToken, VerifyAdmin, slidesGetAll);
router.delete('/:id',validateToken,VerifyAdmin,validateRead,slideDelete);
router.get('/:id',ValidateToken,VerifyAdmin,validateRead,slideDetail);

export default router;
