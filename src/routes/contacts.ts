import express, { Router } from 'express';
import validator from '../validations/contact.validation';
import controller from '../controllers/contacts';
import verifyAdmin from '../middlewares/verifyAdmin';
import validateToken from '../middlewares/authenticateToken';

const router : Router = express.Router();

router.get('/', validateToken, verifyAdmin, controller.getAll);
router.post('/', validateToken, validator.createContact, controller.createContact);

export default router;
