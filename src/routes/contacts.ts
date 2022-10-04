import express, { Router } from 'express';
import validator from '../validations/contact.validation';
import controller from '../controllers/contacts';
import validateToken from '../middlewares/auth';

const router : Router = express.Router();

router.post('/', validateToken, validator.createContact, controller.createContact);

export default router;
