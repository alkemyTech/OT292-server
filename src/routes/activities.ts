import express, { Router} from 'express';
import activityController from '../controllers/activities';
import activityValidator from '../validations/activityValidator';
import verifyAdmin from '../middleware/verifyAdmin';
import validateToken from '../middleware/auth';
import activityCreateValidation from '../validations/activityCreate.validation';
const router:Router = express.Router();

router.put('/:id', validateToken, verifyAdmin, activityValidator.validateUpdate, activityController.updateActivity)
router.post('/',validateToken, verifyAdmin, activityCreateValidation, activityController.createActivity)

export default router;