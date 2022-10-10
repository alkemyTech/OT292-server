import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import db from '../database/models';

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
export {
  getAll,
};
