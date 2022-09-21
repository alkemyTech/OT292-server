import { Response, Request } from 'express';

const { validationResult } = require('express-validator');

const login = async (req: Request, res: Response) : Promise<object> => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body);
  return res.json('MADE LOGINNN!!!');
};

export default { login };
