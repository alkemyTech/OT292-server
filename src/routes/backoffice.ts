import express, { Router} from 'express';
import contac from '../controllers/backoffice'
import verifyAdmin from '../middleware/verifyAdmin';
import verifyToken from '../middleware/auth';

const router:Router = express.Router();

router.get('/contacts', verifyToken, verifyAdmin,contac.getContact);

export default router;