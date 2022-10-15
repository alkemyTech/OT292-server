import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import db from '../models/index';
import upload from '../services/upload';

export const slidesGetAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const slides = await db.Slide.findAll({
      attributes: ['id', 'imageUrl', 'order'],
    });
    if (slides.length === 0) {
      return next(createHttpError(404, 'Slides does not exist'));
    }
    return res.status(200).json({ message: slides, status: 200 });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

export const slideDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slide = await db.Slide.findByPk(req.params.id);
    if (!slide) return next(createHttpError(404, 'Slide not found '));
    return res.status(200).json(slide);
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

export const slideDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slide = await db.Slide.findByPk(req.params.id);
    if (!slide) return next(createHttpError(404, 'Slide not found '));
    return res.status(200).json({ message: 'Slide delete successful', slide });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

export const slideCreate = async (req: Request, res: Response, next: NextFunction) => {
  const { text, order, organizationId } = req.body;
  const image = req.file;
  if (!image) return next(createHttpError(400, 'Must provide an image'));

  try {
    const imageUrl = await upload(image.path);
    const slide = await db.Slide.create({
      order, text, organizationId, imageUrl,
    });
    return res.status(201).json({ message: 'Slide created successfully', slide });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

export const slideUpdate = async (req: Request, res: Response, next: NextFunction) => {
  const {
    imageUrl, text, order, organizationId,
  } = req.body;
  try {
    const slide = await db.Slide.findByPk(req.params.id);
    if (!slide) return next(createHttpError(404, 'Slide not found '));
    slide.imageUrl = imageUrl || slide.imageUrl;
    slide.text = text || slide.text;
    slide.order = order || slide.order;
    slide.organizationId = organizationId || slide.organizationId;
    await slide.save();
    return res.status(200).json(slide);
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

export default {
  slideCreate,
  slidesGetAll,
  slideDetail,
  slideUpdate,
  slideDelete,
};
