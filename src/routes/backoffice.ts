import express, { Router } from 'express';
import contac from '../controllers/backoffice';
import verifyAdmin from '../middlewares/verifyAdmin';
import validateToken from '../middlewares/authenticateToken';

const router:Router = express.Router();

router.get('/contacts', validateToken, verifyAdmin, contac.getContact);

export default router;
