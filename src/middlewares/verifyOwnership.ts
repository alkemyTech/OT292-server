import { NextFunction, Request, Response } from 'express';
/* import createHttpError from 'http-errors'; */
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
      return res.status(401).json({ status: '401', message: 'Not found user' });
    }
  } catch (error: Error | any) {
    return res.status(500).json({ status: '500', message: error });
  }

  try {
    coment = await db.Comment.findOne({ where: { id: idcoment }, attributes: ['userId'] });
    if (!coment) {
      return res.status(404).json({ status: '404', message: 'Not found coment' });
    }
    if (usersearch.roleId === 1) {
      return next();
    }
    if (usersearch.id === coment.userId) {
      return next();
    }
    return res.status(401).json({ status: '401', message: 'No tiene permisos' });
  } catch (error: Error | any) {
    return res.status(500).json({ status: '500', message: error });
  }
}
