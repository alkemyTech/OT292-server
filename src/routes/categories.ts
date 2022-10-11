import { Router } from 'express';
import controller from '../controllers/categories';
import validator from '../validations/category.validation';
import verifyAdmin from '../middlewares/verifyAdmin';
import validateToken from '../middlewares/authenticateToken';

const router = Router();

router.post('/', validateToken, verifyAdmin, validator.createValidator, controller.create);
router.get('/', validateToken, verifyAdmin, validator.listValidator, controller.readAll);
router.get('/:id', validateToken, verifyAdmin, validator.getDetailsValidator, controller.readDetails);
router.put('/:id', validateToken, verifyAdmin, validator.updateValidator, controller.update);
router.delete('/:id', validateToken, verifyAdmin, validator.deleteValidator, controller.remove);

export default router;
