import {Router} from 'express';
import {getNewById} from '../controllers/news';
const router = Router();

router.get('/:id',getNewById);


export default router;