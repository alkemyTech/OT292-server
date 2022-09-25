import { NextFunction, Request, Response } from 'express';
import News, { News as NewsClass } from '../models/news';
import db from '../models/index';

async function index(req : Request, res : Response) {
  res.json({ message: `${News.name} controller` });
}

const getNewById = async (req:Request,res:Response) => {
    try{
      const newById = await db.News.findByPk(req.params.id);
      return res.status(200).json(newById);
    }catch(error){
       return res.status(500).json(error);
    }
}

/**
 * Allows us to create News
 * @param Request request
 * @param Response respose
 * @param NextFunction next
 * @returns
 */
const create = async (req : Request, res: Response, next: NextFunction) => {
  try {
    const newsSaved : NewsClass = await NewsClass.create({
      name: req.body.name,
      content: req.body.content,
      image: req.body.image,
      categoryId: req.body.categoryId ? req.body.categoryId : null,
      type: 'news',
    });

    return res.status(201).json(newsSaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

/**
 * Allows us delete a entry of News.
 * @param req Request
 * @param res Response
 * @param next Next
 */
const deleteNews = async (req : Request, res: Response, next: NextFunction) => {
  try {
    const result : number = await db.News.destroy({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ status: 404, message: 'Resource not found' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default {
  index,
  getNewById,
  create,
  deleteNews
};
