import { Request, Response } from 'express';

async function index (req: Request, res: Response) {
  res.send('Activities controller');
}

export {
  index
};
