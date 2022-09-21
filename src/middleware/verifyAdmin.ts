import { Request, Response, NextFunction } from 'express';
import db from '../models';

export default async function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const { userId } = req;
  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const role = await user.getRole();
  if (role.name !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
}
