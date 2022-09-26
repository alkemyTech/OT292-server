import { NextFunction, Request, Response } from 'express';
import verifyAdmin from './verifyAdmin';

export default async function verifyOwnership(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const userId = req.userId;

  if (Number(id) === Number(userId)) {
    return next();
  }
  return verifyAdmin(req, res, next);
}
