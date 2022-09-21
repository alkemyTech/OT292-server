import express from 'express';
import authController from '../controllers/auth';
import authValidation from '../validations/auth.validation';

const router : express.Router = express.Router();

router.post('/login', authValidation, authController.login);

// router.get('/', (req, res)=>{res.send('Hellowordl')})

export default router;
