import express from "express";
import authController from '../controllers/auth';

const router : express.Router = express.Router();

router.post('/login',authController.login)

router.get('/', (req, res)=>{res.send('Hellowordl')})

export default router;