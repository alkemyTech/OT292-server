import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Role } from '../models/role';
import db from '../models/index';

export default async function verifyOwnership(req: Request, res: Response, next: NextFunction) {
  const idcoment = Number(req.params.id);
  const { userId } = req;
  let usersearch;
  let coment;

  try {
    usersearch = await db.User.findOne({
      where: { id: userId },
      attributes: ['id', 'firstName', 'roleId'],
      include: {
        model: Role,
        attributes: ['name'],
      },
    });
    if (!usersearch) {
      return next(createHttpError(401));
    }
  } catch (error: Error | any) {
    return next(createHttpError(500));
  }

  try {
    coment = await db.Comment.findOne({ where: { id: idcoment }, attributes: ['userId'] });
    if (!coment) {
      return next(createHttpError(404));
    }
    if (usersearch.roleId === 1) {
      return next();
    }
    if (usersearch.id === coment.userId) {
      return next();
    }
    return next(createHttpError(401));
  } catch (error: Error | any) {
    return next(createHttpError(500));
  }
}
