import express, { Router } from 'express';
import testimonialsController from '../controllers/testimonials';
import verifyAdmin from '../middleware/verifyAdmin';
import { verifyToken } from '../utils/jwt.handle';
import testimonialValidator from '../validations/testimonialValidator';
import validateToken from '../middleware/auth';

const router:Router = express.Router();

router.post('/', verifyToken, verifyAdmin, testimonialValidator.validateCreation, testimonialsController.create);
router.delete('/:id', verifyToken, verifyAdmin, testimonialValidator.validateDelete, testimonialsController.deletetestimonial);
router.put('/:id', verifyToken, verifyAdmin, testimonialsController.updatetestimnoial);
router.get('/', validateToken, testimonialsController.getTestimonials);

export default router;
