import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import db from '../models/index';
import { Member } from '../models/member';

export async function index(request: Request, response:Response) {
  response.send(`${db.Member.name}`);
}

export async function createMember(req:Request, res: Response, next:NextFunction) {
  try {
    const memberSaved : Member = await db.Member.create({
      name: req.body.name,
      facebookUrl: req.body.facebookUrl || null,
      instagramUrl: req.body.instagramUrl || null,
      linkedinUrl: req.body.linkedinUrl || null,
      image: req.body.image,
    });

    return res.status(201).json(memberSaved);
  } catch (error : Error | any) {
    if (error instanceof Error) {
      return next(createHttpError(500, error.message, { expose: false }));
    }
    return res.status(500).json(error);
  }
}

export const putMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const member : Member | null = await db.Member.findByPk(req.params.id);
    if (!member) { return next(createHttpError(404)); }

    member.name = req.body.name;
    member.description = req.body.description || null;
    member.facebookUrl = req.body.facebookUrl || null;
    member.instagramUrl = req.body.instagramUrl || null;
    member.linkedinUrl = req.body.linkedinUrl || null;
    member.image = req.body.image;
    await member.save();

    return res.status(200).json({ message: member, status: 200 });
  } catch (error:Error | any) {
    return next(createHttpError(500, error.message, { expose: false }));
  }
};

export async function readAllMembers(req:Request, res: Response, next:NextFunction) {
  try {
    const limit : number | undefined = parseInt(req.query.limit as string, 10) || undefined;
    const offset : number | undefined = parseInt(req.query.offset as string, 10) || undefined;

    const result = await db.Member.findAndCountAll({
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
}
export async function deleteMembers(req:Request, res: Response) {
  const { id } = req.params;
  let membersdelete;
  try {
    membersdelete = await db.Member.destroy({ where: { id } });
    if (!membersdelete) return res.status(404).json({ status: 'Menber Not Found' });
    return res.status(200).json({ status: '200', message: 'Menbers deleted successfully' });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default {
  index,
  readAllMembers,
  createMember,
  putMember,
  deleteMembers,

};
