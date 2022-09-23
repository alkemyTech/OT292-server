import { NextFunction, Request, Response } from 'express';
import News, { News as NewsClass } from '../models/news';

async function index(req : Request, res : Response) {
  res.json({ message: `${News.name} controller` });
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

export default {
  index,
  create,
};
