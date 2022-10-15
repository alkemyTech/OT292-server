import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import { NextFunction } from 'connect';
import createHttpError from 'http-errors';
import db from '../models/index';
import { generateToken } from '../utils/jwt.handle';
import { User } from '../models/user';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userFromDB: User | null = await db.User.findOne({
      where: { email: req.body.email },
      attributes: ['id', 'firstName', 'password', 'roleId'],
    });

    if (userFromDB) {
      const match: boolean = bcrypt.compareSync(req.body.password, userFromDB.password);
      if (match) {
        const token = generateToken(userFromDB.id, userFromDB.roleId);
        return res.status(200).json({ message: { token }, status: 200 });
      }
    }
    return next(createHttpError(401, 'Invalid credentials'));
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

export const authMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const me = await db.User.findByPk(req.userId);
    return res.status(200).json(me);
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};
export default { login, authMe };
