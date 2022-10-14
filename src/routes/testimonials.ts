import express, { Router } from 'express';
import controller from '../controllers/testimonials';
import verifyAdmin from '../middlewares/verifyAdmin';
import validator from '../validations/testimonialValidator';
import validateToken from '../middlewares/authenticateToken';

const router: Router = express.Router();

router.post('/', validateToken, verifyAdmin, validator.validateCreation, controller.create);
router.get('/', validateToken, validator.validateReadAll, controller.readAll);
router.put('/:id', validateToken, verifyAdmin, validator.validateUpdate, controller.update);
router.delete('/:id', validateToken, verifyAdmin, validator.validateDelete, controller.remove);

export default router;
