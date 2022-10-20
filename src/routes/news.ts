import express, { Router } from 'express';
import controller from '../controllers/news';
import validator from '../validations/newsValidator';
import verifyAdmin from '../middlewares/verifyAdmin';
import validateToken from '../middlewares/authenticateToken';

const router: Router = express.Router();

router.post('/', validateToken, verifyAdmin, validator.validateCreation, controller.create);
router.get('/', validateToken, verifyAdmin, validator.validateReadAll, controller.readAll);
router.get('/:id', validateToken, verifyAdmin, validator.validateRead, controller.readDetails);
router.put('/:id', validateToken, verifyAdmin, validator.validateUpdate, controller.update);
router.delete('/:id', validateToken, verifyAdmin, validator.validateDelete, controller.remove);
router.get('/:id/comments', validateToken, validator.validateRead, controller.getComments);

export default router;
