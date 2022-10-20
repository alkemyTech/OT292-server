import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import db from '../models/index';

async function index(req: Request, res: Response) {
  res.send('Activities controller');
}

const createActivity = async (req: Request, res: Response, next: NextFunction) => {
  const { name, content, image } = req.body;
  try {
    const newActivity = await db.Activity.create({
      name,
      content,
      image: image || '',
    });
    return res.status(201).json({ message: newActivity.toJSON(), status: 201 });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};

const updateActivity = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, content, image } = req.body;
  let activity;
  try {
    activity = await db.Activity.findByPk(id);
    if (!activity) return next(createHttpError(404, 'Activity not found'));

    if (name) activity.name = name;
    if (content) activity.content = content;
    if (image) activity.image = image;

    activity.save();
    return res.status(200).json({ status: 200, message: activity });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
};
export default {
  index,
  updateActivity,
  createActivity,
};
