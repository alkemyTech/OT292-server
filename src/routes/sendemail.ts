import express, { NextFunction, Request, Response } from 'express';
import sendWelcomeEmail from '../controllers/sendmail';

const router = express.Router();

/* GET users listing. */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  sendWelcomeEmail('fvaron@itfip.edu.co');
  res.send('respond with a resource');
});

export default router;
