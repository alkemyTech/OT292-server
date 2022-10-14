import express, { Router } from 'express';
import activityController from '../controllers/activities';
import validator from '../validations/activityValidator';
import verifyAdmin from '../middlewares/verifyAdmin';
import validateToken from '../middlewares/authenticateToken';

const router:Router = express.Router();

router.put('/:id', validateToken, verifyAdmin, validator.validateUpdate, activityController.updateActivity);
router.post('/', validateToken, verifyAdmin, validator.validateCreation, activityController.createActivity);

export default router;
