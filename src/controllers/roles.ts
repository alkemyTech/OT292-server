import { Request, Response } from 'express';
import Role from '../database/models/role';

async function index(req: Request, res: Response) {
  res.send('Role controller');
}

export {
  index,
};
