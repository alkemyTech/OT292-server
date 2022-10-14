import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import { NextFunction } from 'connect';
import db from '../models/index';
import { generateToken } from '../utils/jwt.handle';
import { User } from '../models/user';
import {
  buildUser, filterPassword, passwordHash, userByEmail,
} from '../services/userService';

const { validationResult } = require('express-validator');

const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array(), status: 400 }); }

  const existingUser = await userByEmail(req.body.email);
  if (existingUser) {
    return res.status(409).json({
      errors: [
        {
          value: req.body.email,
          msg: 'Email already in use',
        },
      ],
      status: 409,
    });
  }

  const user = buildUser(req.body);
  user.password = passwordHash(req.body.password);

  try {
    const newUser = await user.save();
    const dataUser = filterPassword(newUser);
    return res.status(201).json({ message: dataUser, status: 201 });
  } catch (error) {
    return res.status(404).json({ message: error, status: 404 });
  }
};

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

export const authMe = async (req: Request, res: Response) => {
  try {
    const me = await db.User.findByPk(req.userId);
    return res.status(200).json(me);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export default { login, registerUser };
