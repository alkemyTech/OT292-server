import express, { NextFunction, Request, Response } from 'express';
import { generateToken } from '../utils/jwt.handle';

const router = express.Router();
/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  // res.render('index', { title: 'Express' });
  const token:string =  generateToken('1')
  res.send({token});
});

export default router;
