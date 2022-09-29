import {Router} from 'express';
import {slideDetail,slideDelete} from '../controllers/slides';
import {validateRead} from '../validations/slideValidator';
import VerifyAdmin from '../middleware/verifyAdmin';
import ValidateToken from '../middleware/auth';
import validateToken from '../middleware/auth';



const router = Router();

router.delete('/:id',validateToken,VerifyAdmin,validateRead,slideDelete);
router.get('/:id',ValidateToken,VerifyAdmin,validateRead,slideDetail);




export default router;