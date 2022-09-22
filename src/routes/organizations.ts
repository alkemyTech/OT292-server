import {Router} from 'express';
import {getOrganizationData} from '../controllers/organizations'
const router = Router();

router.get('/public',getOrganizationData);
router.get('/este',getOrganizationData);

export default router;