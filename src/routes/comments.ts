import express, { Router } from 'express';
import commentsController from "../controllers/comments"

const router:Router = express.Router()

router.post('/',commentsController.createComment)

export default router
