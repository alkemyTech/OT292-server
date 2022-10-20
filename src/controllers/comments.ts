import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import db from '../models/index';

const listComments = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const comments = await db.Comment.findAll({
      attributes: ['id', 'body'],
      order: [['created_at', 'ASC']],
    });
    return res.status(200).json({ message: comments, status: 200 });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

export default {
  listComments,
};
