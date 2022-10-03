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

export default {
  index,
  readAllMembers,
  createMember,
};
