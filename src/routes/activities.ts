import express, { Router } from 'express';
import activityController from '../controllers/activities';
import activityValidator from '../validations/activityValidator';
import verifyAdmin from '../middlewares/verifyAdmin';
import validateToken from '../middlewares/authenticateToken';
import activityCreateValidation from '../validations/activityCreate.validation';

const router:Router = express.Router();

router.put('/:id', validateToken, verifyAdmin, activityValidator.validateUpdate, activityController.updateActivity);
router.post('/', validateToken, verifyAdmin, activityCreateValidation, activityController.createActivity);

export default router;
