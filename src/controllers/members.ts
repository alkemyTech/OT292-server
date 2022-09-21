import { Request, Response } from 'express';
import Member from '../models/member';

async function index(request: Request, response:Response) {
  response.send(`${Member.name}`);
}

export default {
  index,
};
