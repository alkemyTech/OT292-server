import { Router, Request, Response } from 'express';
import imgUploadFile from '../services/upload';
import { getOrganizationData, updateOrganization } from '../controllers/organizations';
import validateToken from '../middlewares/authenticateToken';
import verifyAdmin from '../middlewares/verifyAdmin';
import organizationValidation from '../validations/organization.validation';

const router = Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/public', getOrganizationData);
router.get('/este', getOrganizationData);
router.post('/prueba', upload.single('image'), uploadFile);
router.post('/public', validateToken, verifyAdmin, organizationValidation, updateOrganization);

async function uploadFile(req: Request, res: Response) {
  const uploadImage = await imgUploadFile(req.file);
  res.json(uploadImage);
}

export default router;
