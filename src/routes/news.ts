import express, { Router } from 'express';
import newsController from '../controllers/news';
import newsValidator from '../validations/newsValidator';
import verifyAdmin from '../middlewares/verifyAdmin';
import validateToken from '../middlewares/authenticateToken';

const router : Router = express.Router();

router.get('/:id', validateToken, verifyAdmin, newsValidator.validateRead, newsController.getNewById);
router.put('/:id', validateToken, verifyAdmin, newsValidator.validateUpdate, newsController.updateNews);
router.post('/', validateToken, verifyAdmin, newsValidator.validateCreation, newsController.create);
router.delete('/:id', validateToken, verifyAdmin, newsValidator.validateDelete, newsController.deleteNews);
router.get('/', validateToken, verifyAdmin, newsController.list);

export default router;
