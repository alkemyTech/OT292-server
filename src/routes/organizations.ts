import {Router, Request, Response} from 'express';

import {getOrganizationData} from '../controllers/organizations'
import imgUploadFile from '../services/upload';
const router = Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/public',getOrganizationData);
router.get('/este',getOrganizationData);
router.post('/prueba', upload.single('image'),uploadFile)

async function uploadFile(req: Request, res: Response){
    const uploadImage = await imgUploadFile(req.file)
    res.json(uploadImage)
}
export default router;