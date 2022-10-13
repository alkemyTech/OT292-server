import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  buildUser, filterPassword, passwordHash, userByEmail,
} from '../services/userService';
import db from '../models/index';

const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array(), status: 404 }); }

  const existingUser = await userByEmail(req.body.email);
  if (existingUser) {
    return res.status(400).json({ error: 'email already used', status: 400 });
  }

  const user = buildUser(req.body);
  user.password = passwordHash(req.body.password);

  try {
    const newUser = await user.save();
    const dataUser = filterPassword(newUser);
    return res.status(200).json({ message: dataUser, status: 200 });
  } catch (error) {
    return res.status(404).json({ message: error, status: 404 });
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

async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  const existingUser = await db.User.findByPk(id);
  if (!existingUser) {
    return res.status(400).json({ error: 'Username does not exist' });
  }
  try {
    await db.User.destroy({ where: { id } });
    return res.status(200).json({ message: 'User Deleted' });
  } catch (error) {
    return res.status(400).json({ error: 'Could not delete' });
  }
}

async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { firstName, lastName, photo } = req.body;

  const existingUser = await db.User.findByPk(id);
  if (!existingUser) {
    return res.status(404).json({ message: 'Username does not exist', status: 404 });
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
  } catch (error) {
    return res.status(500).json({ message: 'Could not delete', status: 500 });
  }
}

export default {
  createUser,
  getAll,
  deleteUser,
  updateUser,
};
