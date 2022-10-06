import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getCategory } from '../services/categoryService';
import db from '../models';
import { Category } from '../models/category';
import page from '../utils/pagination'

export async function remove(req: Request, res: Response) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array(), status: 404 });
  }

  const result = await db.Category.destroy({ where: { id: req.params.id } });
  if (!result) {
    return res.status(404).json({ message: 'Category not found', status: 404 });
  }
  return res.status(204).json({ status: 204 });
}

/**
 * Allows us to update an existent category
 * @param req Request
 * @param res Response
 */
export const putCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category : Category | null = await db.Category.findByPk(req.params.id);
    if (!category) { return res.status(404).json({ status: 404, message: 'Resource not found' }); }

    category.name = req.body.name;
    category.description = req.body.description || null;
    category.image = req.body.image;
    await category.save();

    return res.status(200).json({ message: category, status: 200 });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getDetails = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = parseInt(req.params.id, 10);
  const category = await getCategory(id);

  if (!category) {
    return res.status(404).json({ message: 'Category not found', status: 404 });
  }

  return res.status(200).json({ message: category.toJSON(), status: 200 });
};

export const create = async (req:Request, res:Response) => {
  try {
    const newCategory = await db.Category.create(req.body);
    return res.status(200).json({ message: `The Category ${newCategory.name} has been created Successful` });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export async function list(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const resource = req.baseUrl
 const pag:any = req.query.page || 1
  const categories = await db.Category.findAndCountAll({  limit: 10,
    offset: 10 * (pag - 1), attributes: ['name'] });
const paginat = await page.calculatePage(categories.count, pag, resource)
  return res.status(200).json(
    { message: { pagination:paginat,categories: categories.rows }, status: 200 },
  );
}

export default {
  getDetails,
  create,
  list
};
