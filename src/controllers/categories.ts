import { Request, Response } from "express";
import Category from '../models/category';

const index = async (req: Request, res: Response) => {
    res.send('Categories controller');
}

export { 
    index 
};