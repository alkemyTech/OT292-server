import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import { NextFunction } from 'connect';
import db from '../models/index';

const { validationResult } = require('express-validator');

const login = async (req: Request, res: Response, next : NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }

  try {
    const userFromDB : any | null = await db.User.findOne({
      where: { email: req.body.email },
      attributes: ['id', 'firstName', 'password', 'roleId'],
    });

    if (userFromDB) {
      const match : boolean = bcrypt.compareSync(req.body.password, userFromDB.password);
      if (match) {
        const userResponse = {
          id: userFromDB.id,
          firstName: userFromDB.firstName,
          roleId: userFromDB.roleId,
        };
        return res.status(200).json(userResponse);
      }
    }

    return res.status(403).json({ ok: false });
  } catch (error) {
    next(error);
  }
};

export const authMe = async(req:Request,res:Response)=> {
    try{
      const me = await db.User.findByPk(req.userId);
      return res.status(200).json(me)
    }catch(error){
      return res.status(500).json(error);
    }
}

export default { login };
