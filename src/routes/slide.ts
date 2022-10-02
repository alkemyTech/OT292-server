import {Router} from 'express';
import {slideDetail} from '../controllers/slides';
import {validateRead} from '../validations/slideValidator';
import VerifyAdmin from '../middleware/verifyAdmin';
import ValidateToken from '../middleware/auth';



const router = Router();

router.get('/:id',ValidateToken,VerifyAdmin,validateRead,slideDetail);



export default router;