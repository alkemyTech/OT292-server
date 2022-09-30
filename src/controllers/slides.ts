import { Request, Response } from 'express';
import db from '../models/index';

export const slidesGetAll = async (_req: Request, res: Response) => {
  try {
    const slides = await db.Slide.findAll({
      attributes: ['id', 'imageUrl', 'order'],
    });
    if (!slides) {
      return res.status(404).json({ message: 'Slides does not exist', status: 404 });
    }
    return res.status(200).json({ message: slides, status: 200 });
  } catch (error) {
    return res.status(400).json({ message: error, status: 400 });
  }
};
