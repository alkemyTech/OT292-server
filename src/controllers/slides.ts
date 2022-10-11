import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import db from '../database/models/index';
import upload from '../services/upload';

export const slidesGetAll = async (_req: Request, res: Response) => {
  try {
    const slides = await db.Slide.findAll({
      attributes: ['id', 'imageUrl', 'order'],
    });
    if (slides.length === 0) {
      return res.status(404).json({ message: 'Slides does not exist', status: 404 });
    }
    return res.status(200).json({ message: slides, status: 200 });
  } catch (error) {
    return res.status(400).json({ message: error, status: 400 });
  }
};

export const slideDetail = async (req: Request, res: Response) => {
  try {
    const slide = await db.Slide.findByPk(req.params.id);
    if (!slide) return res.status(404).json({ message: 'Slide not found ' });
    return res.status(200).json(slide);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const slideDelete = async (req: Request, res: Response) => {
  try {
    const slide = await db.Slide.findByPk(req.params.id);
    if (!slide) return res.status(404).json({ message: 'Slide not found' });
    return res.status(200).json({ message: 'Slide delete successful', slide });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const slideCreate = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { text, order, organizationId } = req.body;
  const image = req.file;
  if (!image) return res.status(400).json({ message: 'Must provide an image' });

  try {
    const imageUrl = await upload(image.path);
    const slide = await db.Slide.create({
      order, text, organizationId, imageUrl,
    });
    return res.status(201).json({ message: 'Slide created successfully', slide });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const slideUpdate = async (req:Request, res:Response) => {
  const {
    imageUrl, text, order, organizationId,
  } = req.body;
  try {
    const slide = await db.Slide.findByPk(req.params.id);
    if (!slide) return res.status(404).json({ message: 'Slide not found' });
    slide.imageUrl = imageUrl || slide.imageUrl;
    slide.text = text || slide.text;
    slide.order = order || slide.order;
    slide.organizationId = organizationId || slide.organizationId;
    await slide.save();
    return res.status(200).json(slide);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default {
  slideCreate,
  slidesGetAll,
  slideDetail,
  slideUpdate,
  slideDelete,
};
