import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import db from '../models/index';
import calculatePage from '../utils/pagination';

const getTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  const resource = req.baseUrl;
  const pag: number = Number(req.query.page) || 1;
  const testimonial = await db.Testimonial.findAndCountAll({
    limit: 10,
    offset: 10 * (pag - 1),
    attributes: ['id', 'name', 'image'],
  });
  try {
    const paginations = await calculatePage(testimonial.count, pag, resource);
    return res.status(200).json({
      message: { pagination: paginations, testimonial: testimonial.rows },
      status: 200,
    });
  } catch (error : Error | any) {
    return next(createHttpError(500, error.message, { expose: false }));
  }
};

const create = async (req: Request, res: Response) => {
  const { name, content, image } = req.body;
  let newTestimonial;
  try {
    newTestimonial = await db.Testimonial.create({ name, content, image });
    res.status(200).send(newTestimonial);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletetestimonial = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const destroy = await db.Testimonial.destroy({ where: { id } });
    if (!destroy) return res.status(404).json({ status: 404, message: 'Testimonial not found' });
    return res.status(200).json({ status: 200, message: 'Testimonial deleted' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
const updatetestimnoial = async (req:Request, res:Response) => {
  const { id } = req.params;
  const { name, content, image } = req.body;
  let update;

  try {
    update = await db.Testimonial.findByPk(id);
    if (!update) return res.status(404).json({ message: 'No found testimonial' });
    if (name) update.name = name;
    if (content) update.content = content;
    if (image) update.image = image;
    try {
      update.save();
    } catch (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json({ status: 200, message: update });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default {
  create,
  deletetestimonial,
  updatetestimnoial,
  getTestimonials,
};
