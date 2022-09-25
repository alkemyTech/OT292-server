import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import { NextFunction } from 'connect';
import db from '../models/index';
import { generateToken } from '../utils/jwt.handle';
import { User } from '../models/user';

const { validationResult } = require('express-validator');

const login = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }

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

    return res.status(403).json({ ok: false });
  } catch (error) {
    return next(error);
  }
};

export default { login };
