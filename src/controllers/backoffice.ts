import { Request, Response, NextFunction } from 'express';
import contact from './contacts';

const getContact = async (req: Request, res: Response, next: NextFunction) => {
  await contact.getAll(req, res, next);
};

export default {
  getContact,
};
