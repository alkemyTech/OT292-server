import db from "../models/index";
import { Request, Response, NextFunction } from 'express';
import {Comment as CommentClass} from "../models/comment";
import createHttpError from "http-errors";


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

const createComment = async (req: Request, res:Response, next: NextFunction) =>{
    try {
      const userId= req.userId;
        const commentSaved : CommentClass = await db.Comment.create({
          userId,
          newId:req.body.newId,
          body: req.body.body,
        });
  
        return res.status(201).json({
          status:201,
          message:commentSaved
        });
      } catch (error: Error | any) {
        return next(createHttpError(500, error.message));
      }
  };

export default {
  listComments,
  createComment
};
