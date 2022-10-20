import express, { Router } from 'express';
import commentsController from "../controllers/comments"
import { validateCreateComment } from '../validations/commentValidator';
import validateToken from '../middlewares/authenticateToken';

const router:Router = express.Router()

router.post('/',validateToken,validateCreateComment,commentsController.createComment)

export default router
