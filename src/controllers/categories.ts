import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import db from '../models';

export async function remove(req: Request, res: Response) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array(), status: 404 });
  }

  const result = await db.Category.destroy({ where: { id: req.params.id } });
  if (result === 0) {
    return res.status(404).json({ message: 'Category not found', status: 404 });
  }
  return res.status(204).json({ status: 204 });
}
