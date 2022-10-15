import { Router } from 'express';
import controller from '../controllers/slides';
import validator from '../validations/slideValidator';
import verifyAdmin from '../middlewares/verifyAdmin';
import validateToken from '../middlewares/authenticateToken';
import uploadMiddleware from '../services/multer';

const router = Router();

router.post('/', validateToken, verifyAdmin, uploadMiddleware.single('image'), validator.validateCreate, controller.slideCreate);
router.get('/', validateToken, verifyAdmin, controller.slidesGetAll);
router.get('/:id', validateToken, verifyAdmin, validator.validateRead, controller.slideDetail);
router.put('/:id', validateToken, verifyAdmin, validator.validateUpdate, controller.slideUpdate);
router.delete('/:id', validateToken, verifyAdmin, validator.validateRead, controller.slideDelete);

export default router;
