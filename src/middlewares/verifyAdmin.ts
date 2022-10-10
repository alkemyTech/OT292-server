import { Request, Response, NextFunction } from 'express';
import db from '../database/models';

export default async function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const { userId } = req;
  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized', status: 401 });
  }
  const role = await user.getRole();
  if (!role || role.name !== 'admin') {
    return res.status(403).json({ message: 'Forbidden', status: 403 });
  }
  return next();
}
