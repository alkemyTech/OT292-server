import express, { Router } from 'express';
import newsController from '../controllers/news';
import newsValidator from '../validations/newsValidator';
import verifyAdmin from '../middleware/verifyAdmin';
import validateToken from '../middlewares/auth';
import {getNewById} from '../controllers/news';

const router : Router = express.Router();

router.get('/:id',getNewById);
router.post('/', validateToken, verifyAdmin, newsValidator.validateCreation, newsController.create);

export default router;

