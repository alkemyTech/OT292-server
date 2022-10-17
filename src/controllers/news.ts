import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { News } from '../models/news';
import db from '../models/index';
import calculatePage from '../utils/pagination';

async function index(req: Request, res: Response) {
  res.json({ message: `${News.name} controller` });
}

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit: number = parseInt(req.query.limit as string, 10) || 10;
    const offset: number | undefined = parseInt(req.query.offset as string, 10) || 10;
    const page: number = parseInt(req.query.page as string, 10) || 1;

    const categories = await db.News.findAndCountAll({
      limit,
      offset: offset * (page - 1),
      attributes: ['name'],
    });
    const paginat = calculatePage(categories.count, page, offset, limit, req.baseUrl);
    return res.status(200).json({
      message: { pagination: paginat, categories: categories.rows },
      status: 200,
    });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

const readDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newById = await db.News.findByPk(req.params.id);
    return res.status(200).json(newById);
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

/**
 * Allows us to create News
 * @param Request request
 * @param Response respose
 * @param NextFunction next
 * @returns
 */
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newsSaved: News = await News.create({
      name: req.body.name,
      content: req.body.content,
      image: req.body.image,
      categoryId: req.body.categoryId ? req.body.categoryId : null,
      type: 'news',
    });

    return res.status(201).json(newsSaved);
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

/**
 * Allows us delete a entry of News.
 * @param req Request
 * @param res Response
 * @param next Next
 */
const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: number = await db.News.destroy({
      where: { id: req.params.id },
    });
    if (!result) {
      return res
        .status(404)
        .json({ status: 404, message: 'Resource not found' });
    }
    return res.sendStatus(204);
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const {
    name, content, image, categoryId,
  } = req.body;

  let news;
  try {
    news = await db.News.findByPk(id);
    if (!news) { return next(createHttpError(404, 'News not found')); }

    if (name) news.name = name;
    if (content) news.content = content;
    if (image) news.image = image;
    if (categoryId) news.categoryId = categoryId;
    news.save();

    return res.status(200).json({ message: news, status: 200 });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

const getComments = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const comments = db.Comment.findAll({ where: { newId: id } });
    return res.status(200).json({ message: comments, status: 200 });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

export default {
  index,
  create,
  readDetails,
  readAll,
  update,
  remove,
  getComments,
};
