import express, { Router } from 'express';
import validator from '../validations/contact.validation';
import controller from '../controllers/contacts';
import verifyAdmin from '../middleware/verifyAdmin';
import validateToken from '../middlewares/auth';

const router : Router = express.Router();

router.get('/', validateToken, verifyAdmin, validator.readAll, controller.getAll);
router.post('/', validateToken, validator.createContact, controller.createContact);

export default router;
