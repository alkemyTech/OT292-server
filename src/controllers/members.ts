import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import db from '../models/index';
import { Member } from '../models/member';
import calculatePage from '../utils/pagination';

export async function index(request: Request, response: Response) {
  response.send(`${db.Member.name}`);
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const memberSaved: Member = await db.Member.create({
      name: req.body.name,
      facebookUrl: req.body.facebookUrl || null,
      instagramUrl: req.body.instagramUrl || null,
      linkedinUrl: req.body.linkedinUrl || null,
      image: req.body.image,
      description: req.body.description || null,
    });

    return res.status(201).json({ status: 201, message: memberSaved });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message, { expose: false }));
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const member: Member | null = await db.Member.findByPk(req.params.id);
    if (!member) { return next(createHttpError(404)); }

    member.name = req.body.name;
    member.description = req.body.description || null;
    member.facebookUrl = req.body.facebookUrl || null;
    member.instagramUrl = req.body.instagramUrl || null;
    member.linkedinUrl = req.body.linkedinUrl || null;
    member.image = req.body.image;
    await member.save();

    return res.status(200).json({ message: member, status: 200 });
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message, { expose: false }));
  }
};

export async function readAll(req: Request, res: Response, next: NextFunction) {
  try {
    const limit: number = parseInt(req.query.limit as string, 10) || 10;
    const offset: number = parseInt(req.query.offset as string, 10) || 10;
    const page: number = parseInt(req.query.page as string, 10) || 1;

    const result = await db.Member.findAndCountAll({
      attributes: ['name'],
      limit,
      offset: offset * (page - 1),
    });

    const pages = calculatePage(result.count, page, offset, limit, req.baseUrl);
    return res.status(200).json(
      { message: { pagination: pages, members: result.rows.map((r) => r.toJSON()) }, status: 200 },
    );
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message, { expose: false }));
  }
}
export async function remove(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  let membersdelete;
  try {
    membersdelete = await db.Member.destroy({ where: { id } });
    if (!membersdelete) return next(createHttpError(404));
    return res.status(204).end();
  } catch (error: Error | any) {
    return next(createHttpError(500, error.message));
  }
}

export default {
  index,
  create,
  readAll,
  update,
  remove,
};
