import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import db from '../models/index';
import calculatePage from '../utils/pagination';

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  const limit: number = parseInt(req.query.limit as string, 10) || 10;
  const offset: number | undefined = parseInt(req.query.offset as string, 10) || 10;
  const page: number = parseInt(req.query.page as string, 10) || 1;

  try {
    const testimonial = await db.Testimonial.findAndCountAll({
      limit,
      offset: offset * (page - 1),
      attributes: ['id', 'name', 'image'],
    });

    const pages = calculatePage(testimonial.count, page, offset, limit, req.baseUrl);
    return res.status(200).json({
      message: { pagination: pages, testimonials: testimonial.rows },
      status: 200,
    });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message, { expose: false }));
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { name, content, image } = req.body;
  let newTestimonial;
  try {
    newTestimonial = await db.Testimonial.create({ name, content, image });
    return res.status(200).send(newTestimonial);
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message, { expose: false }));
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const destroy = await db.Testimonial.destroy({ where: { id } });
    if (!destroy) return next(createHttpError(404, 'Testimonial not found'));
    return res.status(200).json({ status: 200, message: 'Testimonial deleted' });
  } catch (error : Error | any) {
    return next(createHttpError(500, error.message, { expose: false }));
  }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, content, image } = req.body;
  let updated;

  try {
    updated = await db.Testimonial.findByPk(id);
    if (!updated) return next(createHttpError(404, 'Testimonial not found'));
    if (name) updated.name = name;
    if (content) updated.content = content;
    if (image) updated.image = image;
    updated.save();

    return res.status(200).json({ status: 200, message: updated });
  } catch (error : Error | any) {
    return next(createHttpError(500, error.message, { expose: false }));
  }
};

export default {
  create,
  readAll,
  update,
  remove,
};
