import { NextFunction, Request, Response } from 'express';
import verifyAdmin from './verifyAdmin';

export default async function verifyOwnership(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { userId } = req.body;
  if (id === userId) {
    return next();
  }
  return verifyAdmin(req, res, next);
}
