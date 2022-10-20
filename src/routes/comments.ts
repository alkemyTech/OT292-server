import express, { Router } from 'express';
import commentsController from '../controllers/comments';
import validateToken from '../middlewares/authenticateToken';
import verifyAdmin from '../middlewares/verifyAdmin';

const router:Router = express.Router();

router.get('/', validateToken, verifyAdmin, commentsController.listComments);

export default router;
