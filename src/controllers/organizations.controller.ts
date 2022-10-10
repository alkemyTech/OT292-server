import { Request, Response } from 'express';

// index controller
const index = async (req: Request, res: Response) => {
    res.send('organization ctrl');
}

export { index };