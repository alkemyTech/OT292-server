import express, { Router } from 'express';
import newsController from '../controllers/news';
import newsValidator from '../validations/newsValidator';
import verifyAdmin from '../middleware/verifyAdmin';
import validateToken from '../middlewares/auth';


const router : Router = express.Router();


router.get('/:id',validateToken,verifyAdmin,newsValidator.validateRead,newsController.getNewById);
router.put('/:id', validateToken, verifyAdmin, newsValidator.validateUpdate, newsController.updateNews)
router.post('/', validateToken, verifyAdmin, newsValidator.validateCreation, newsController.create);
router.delete('/:id', validateToken, verifyAdmin, newsValidator.validateDelete, newsController.deleteNews);

export default router;
