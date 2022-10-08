import express, {Router} from 'express';
import commentsController from '../controllers/comments'

const router : Router = express.Router() 

router.get('/:comment_id',commentsController.getCommentById)
router.post('/',commentsController.create)

export default router;