import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import db from '../models/index';
import { Comment as CommentClass } from '../models/comment';

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

const createComment = async (req: Request, res:Response, next: NextFunction) => {
  try {
    const { userId } = req;
    if (userId === undefined) throw new Error('userId must be present');
    const commentSaved : CommentClass = await db.Comment.create({
      userId,
      newId: req.body.newId,
      body: req.body.body,
    });
    return res.status(201).json({
      status: 201,
      message: commentSaved,
    });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};
const deleteComent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const destroy = await db.Comment.destroy({ where: { id } });
    if (!destroy) return res.status(404).json({ status: 404, message: 'Comment not found' });
    return res.status(200).json({ status: 200, message: 'Comment delete' });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};
export default {
  listComments,
  createComment,
  deleteComent,
};
