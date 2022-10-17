import { Router } from 'express';
import controller from '../controllers/organizations';
import validateToken from '../middlewares/authenticateToken';
import verifyAdmin from '../middlewares/verifyAdmin';
import validator from '../validations/organization.validation';

const router = Router();

router.get('/index', controller.index);
router.get('/public', controller.readDetails);
router.post('/public', validateToken, verifyAdmin, validator.update, controller.update);

export default router;
