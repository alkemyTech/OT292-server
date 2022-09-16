import { Request, Response } from 'express';
import Organization from '../models/organization';

// index controller
const index = async (req: Request, res: Response) => {
    res.send('organization ctrl');
}

export { index };