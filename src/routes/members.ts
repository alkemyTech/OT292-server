import express from 'express';
import controller from '../controllers/members';
import validator from '../validations/member.validation';
import validateToken from '../middlewares/authenticateToken';
import verifyAdmin from '../middlewares/verifyAdmin';

const router = express.Router();

router.post('/', validateToken, validator.validateCreation, controller.create);
router.get('/', validateToken, verifyAdmin, validator.validateReadAll, controller.readAll);
router.put('/:id', validateToken, validator.validateUpdate, controller.update);
router.delete('/:id', validateToken, verifyAdmin, validator.validateDelete, controller.remove);

export default router;
