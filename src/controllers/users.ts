import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import {
  buildUser, filterPassword, passwordHash, userByEmail,
} from '../services/userService';
import db from '../models/index';
import upload from '../services/upload';
import sendWelcomeEmail from './sendmail';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const image = req.file;
  if (!image) return next(createHttpError(400, 'Must provide an image'));
  const existingUser = await userByEmail(req.body.email);
  if (existingUser) {
    return next(createHttpError(409, 'Email already used'));
  }
  const user = buildUser(req.body);
  user.password = passwordHash(req.body.password);
  user.photo = await upload(image);

  try {
    const newUser = await user.save();
    sendWelcomeEmail(newUser.email);
    const dataUser = filterPassword(newUser);
    return res.status(201).json({ message: dataUser, status: 201 });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message, { expose: false }));
  }
};

const getAll = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const list = await db.User.findAll();
  console.log(list.length);
  if (list.length > 0) {
    return res.status(200).json({ message: list, status: 200 });
  }
  return res.status(200).json({ message: 'no registered users', status: 200 });
};

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  const existingUser = await db.User.findByPk(id);
  if (!existingUser) {
    return next(createHttpError(404, 'Username does not exist'));
  }
  try {
    await db.User.destroy({ where: { id } });
    return res.status(200).json({ message: 'User Deleted' });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message, { expose: false }));
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { firstName, lastName, photo } = req.body;

  const existingUser = await db.User.findByPk(id);
  if (!existingUser) {
    return next(createHttpError(404, 'Username does not exist'));
  }

  const updateData = {
    firstName: firstName || existingUser.firstName,
    lastName: lastName || existingUser.lastName,
    photo: photo || existingUser.photo,
  };

  try {
    await db.User.update(updateData, {
      where: { id },
    });
    const userModified = await db.User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    return res.status(200).json({ message: userModified?.toJSON(), status: 200 });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message, { expose: false }));
  }
}

export default {
  createUser,
  getAll,
  deleteUser,
  updateUser,
};
