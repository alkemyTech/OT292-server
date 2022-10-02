import {Router} from 'express';
import {getOrganizationData, updateOrganization} from '../controllers/organizations'
import validateToken from '../middleware/auth';
import verifyAdmin from '../middleware/verifyAdmin';
import organizationValidation from '../validations/organization.validation';
const router = Router();

router.get('/public',getOrganizationData);
router.get('/este',getOrganizationData);
router.post('/public',validateToken,verifyAdmin ,organizationValidation, updateOrganization)

export default router;