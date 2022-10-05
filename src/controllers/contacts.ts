import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import db from '../models/index';

const getAll = async (req: Request, res:Response, next: NextFunction) => {
  try {
    const limit : number | undefined = parseInt(req.query.limit as string, 10) || undefined;
    const offset : number | undefined = parseInt(req.query.offset as string, 10) || undefined;

    const result = await db.Contact.findAndCountAll({
      attributes: ['name'],
      limit,
      offset,
    });

    return res.status(200).json(
      { message: { count: result.count, members: result.rows }, status: 200 },
    );
  } catch (error : Error | any) {
    return next(createHttpError(500, error.message, { expose: false }));
  }
};

export default {
  getAll,
};
