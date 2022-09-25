import express, { Router} from 'express';
import activityController from '../controllers/activities';
import activityValidator from '../validations/activityValidator';
import verifyAdmin from '../middleware/verifyAdmin';
import validateToken from '../middleware/auth';


const router:Router = express.Router();

router.put('/:id', validateToken, verifyAdmin, activityValidator.validateUpdate, activityController.updateActivity)

export default router;