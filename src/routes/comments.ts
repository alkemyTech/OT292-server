import express, { Router } from 'express';
import commentsController from '../controllers/comments';
import { validateCreateComment } from '../validations/commentValidator';
import validateToken from '../middlewares/authenticateToken';
import verifyAdmin from '../middlewares/verifyAdmin';
import verifyOwnership from '../middlewares/verifyOwnership';

const router:Router = express.Router();

router.get('/', validateToken, verifyAdmin, commentsController.listComments);
router.post('/', validateToken, validateCreateComment, commentsController.createComment);
router.delete('/:id', validateToken, verifyOwnership, commentsController.deleteComent);

export default router;
