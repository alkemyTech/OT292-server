import express, { Router } from 'express';
import testimonialsController from '../controllers/testimonials';
import verifyAdmin from '../middlewares/verifyAdmin';
import testimonialValidator from '../validations/testimonialValidator';
import validateToken from '../middlewares/authenticateToken';

const router:Router = express.Router();

router.post('/', validateToken, verifyAdmin, testimonialValidator.validateCreation, testimonialsController.create);
router.delete('/:id', validateToken, verifyAdmin, testimonialValidator.validateDelete, testimonialsController.deletetestimonial);
router.put('/:id', validateToken, verifyAdmin, testimonialsController.updatetestimnoial);
router.get('/', validateToken, testimonialsController.getTestimonials);

export default router;
