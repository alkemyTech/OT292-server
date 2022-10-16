import db from "../models/index";
import { Request, Response, NextFunction } from 'express';
import {Comment as CommentClass} from "../models/comment";

const createComment = async (req: Request, res:Response, next: NextFunction) =>{
    try {
        const commentSaved : CommentClass = await db.Comment.create({
          userId:req.body.userId,
          newId:req.body.newId,
          body: req.body.body,
        });
  
        return res.status(201).json(commentSaved);
      } catch (error) {
        return res.status(400).json(error);
      }
    };

export default{
    createComment
};