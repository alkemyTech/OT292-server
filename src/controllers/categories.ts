import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getCategory } from '../services/categoryService';
import db from '../models';

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

export async function getDetails(req: Request, res: Response) {
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
}

export async function list(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const offset = parseInt(req.query.offset as string, 10) || 0;
  const limit = parseInt(req.query.limit as string, 10) || 20;
  const categories = await db.Category.findAndCountAll({ offset, limit, attributes: ['name'] });

  return res.status(200).json(
    { message: { count: categories.count, categories: categories.rows }, status: 200 },
  );
}
