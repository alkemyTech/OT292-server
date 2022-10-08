import { NextFunction,Request,Response } from "express";
import { DefaultSerializer } from "v8";
import Comment, {Comment as CommentClass} from "../models/comment"
import db from "../models/index"

async function index(req : Request, res : Response) {
    res.json({ message: `${Comment.name} controller` });
  }

  const getCommentById = async (req:Request,res:Response) => {
    try{
      const commentById = await db.Comment.findByPk(req.params.id);
      return res.status(200).json(commentById);
    }catch(error){
       return res.status(500).json(error);
    }
}

  /**
 * Allows us to create Comment
 * @param Request request
 * @param Response respose
 * @param NextFunction next
 * @returns
 */
const create = async (req : Request, res: Response, next: NextFunction) => {
    try {
      const commentsSaved : CommentClass = await CommentClass.create({
        user_id:req.body.user_id,
        new_id:req.body.new_id,
        content: req.body.content,
        type: 'comment'
      });
  
      return res.status(201).json(commentsSaved);
    } catch (error) {
        console.log("Jijo")
      return res.status(400).json(error);
    }
  };

  export default
  {
    index,
    getCommentById,
    create
  }