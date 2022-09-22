import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.handle';

export default function validateToken(req: Request, res: Response, next: NextFunction) {
  try {
    let token = req.headers.authorization || '';
    if (!token.startsWith('Bearer ')) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    token = token.slice(7, token.length);
    const payload = verifyToken(token) as { id: number };
    req.userId = payload.id;
    return next();
  } catch (error) {
    console.log(error)
    return res.status(403).json({ error: 'Invalid token' });
  }
}