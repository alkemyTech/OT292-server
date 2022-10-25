import db from "../models/index";
import { Request, Response, NextFunction } from 'express';
import {Comment as CommentClass} from "../models/comment";
import createHttpError from "http-errors";
import { param } from "express-validator";


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
      if(userId===undefined) throw new Error("userId must be present");
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

async function updateComment(req: Request, res: Response, next: NextFunction) {
    const { body } = req.body;
    const { id } = req.params;
    const existingComment = await db.Comment.findByPk(id);
    if (!existingComment) {
      return next(createHttpError(404, 'Comment does not exist'));
    }

    const updateData = {
      body: body || existingComment.body,
    };
  
    try {
      await db.Comment.update(updateData, {
        where: { id},
      });
      const commentModified = await db.Comment.findByPk(id);
      return res.status(200).json({ message: commentModified?.toJSON(), status: 200 });
    } catch (error: Error | any) {
      return next(createHttpError(500, error.message, { expose: false }));
    }
}

export default {
  listComments,
  createComment,
  updateComment
};
