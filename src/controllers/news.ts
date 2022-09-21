import { Request, Response } from 'express';
import News from '../models/news';

async function index(req : Request, res : Response) {
  res.send(`${News.name} controller`);
}

export default {
  index,
};
