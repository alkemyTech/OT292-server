import { NextFunction, Request, Response } from 'express';
import db from '../models/index';
import { News } from '../models/news';

async function index(req : Request, res : Response) {
  res.json({ message: `${News.name} controller` });
}

/**
 * Allows us delete a entry of News.
 * @param req Request
 * @param res Response
 * @param next Next
 */
const deleteNews = async (req : Request, res: Response, next: NextFunction) => {
  try {
    const result : number = await db.News.destroy({ where: { id: req.params.id } });

    if (result === 0) return res.status(404).json({ status: 404, message: 'Resource not finded' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  index,
  deleteNews,
};
