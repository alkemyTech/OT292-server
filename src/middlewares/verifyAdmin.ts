import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import db from '../models';

export default async function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const { userId } = req;
  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return next(createHttpError(401));
  }
  const role = await user.getRole();
  if (!role || role.name !== 'admin') {
    return next(createHttpError(403));
  }
  return next();
}
