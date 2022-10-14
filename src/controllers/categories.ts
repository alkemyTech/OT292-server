import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getCategory } from '../services/categoryService';
import db from '../models';
import { Category } from '../models/category';
import calculatePage from '../utils/pagination';
import createHttpError from 'http-errors';

export async function remove(req: Request, res: Response, next: NextFunction) {
  const result = await db.Category.destroy({ where: { id: req.params.id } });
  if (!result) {
    return next(createHttpError(404, 'Category not found'));
  }
  return res.status(204).json({ status: 204 });
}

/**
 * Allows us to update an existent category
 * @param req Request
 * @param res Response
 */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category: Category | null = await db.Category.findByPk(req.params.id);
    if (!category) { return next(404); }

    category.name = req.body.name;
    category.description = req.body.description || null;
    category.image = req.body.image;
    await category.save();

    return res.status(200).json({ message: category, status: 200 });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

export const readDetails = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const category = await getCategory(id);

  if (!category) {
    return next(createHttpError(404, 'Category not found'));
  }

  return res.status(200).json({ message: category.toJSON(), status: 200 });
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCategory = await db.Category.create(req.body);
    return res.status(200).json({
      message: `The Category ${newCategory.name} has been created Successful`,
    });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

export async function readAll(req: Request, res: Response) {
  const limit: number = parseInt(req.query.limit as string, 10) || 10;
  const offset: number | undefined = parseInt(req.query.offset as string, 10) || 10;
  const page: number = parseInt(req.query.page as string, 10) || 1;

  const categories = await db.Category.findAndCountAll({
    limit,
    offset: offset * (page - 1),
    attributes: ['name'],
  });
  const pages = calculatePage(categories.count, page, offset, limit, req.baseUrl);
  return res.status(200).json({
    message: { pagination: pages, categories: categories.rows },
    status: 200,
  });
}

export default {
  create,
  readDetails,
  readAll,
  update,
  remove,
};
