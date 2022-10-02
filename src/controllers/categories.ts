import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { devNull } from 'os';
import { where } from 'sequelize';
import { getCategory } from '../services/categoryService';
import db from '../models';
import { Category } from '../models/category';

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
}

export const create = async (req:Request,res:Response) => {
    try{
        const newCategory = await db.Category.create(req.body);
         return res.status(200).json({message : `The Category ${newCategory.name} has been created Successful`});
    }catch(error){
      return res.status(500).json(error);
    }
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

export default {
  getDetails,
  create
};