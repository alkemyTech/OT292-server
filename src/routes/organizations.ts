import { Router, Request, Response } from 'express';
import imgUploadFile from '../services/upload';
import controller from '../controllers/organizations';
import validateToken from '../middlewares/authenticateToken';
import verifyAdmin from '../middlewares/verifyAdmin';
import validator from '../validations/organization.validation';

const router = Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

async function uploadFile(req: Request, res: Response) {
  const uploadImage = await imgUploadFile(req.file);
  res.json(uploadImage);
}

router.get('/public', controller.readDetails);
router.get('/este', controller.readDetails);
router.post('/prueba', upload.single('image'), uploadFile);
router.post('/public', validateToken, verifyAdmin, validator.update, controller.update);

export default router;
