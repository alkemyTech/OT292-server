import express, { Router } from 'express';
import newsController from '../controllers/news';
import newsValidator from '../validations/newsValidator';
import verifyAdmin from '../middleware/verifyAdmin';
import validateToken from '../middlewares/auth';

const router : Router = express.Router();

router.delete('/:id', validateToken, verifyAdmin, newsValidator.validateDelete, newsController.deleteNews);

export default router;
