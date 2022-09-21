
import { Request, Response } from 'express';
import db from '../models/index'

async function deleteUser (req: Request, res: Response) {
    const id = req.params.id; 
    
    const existingUser = await db.User.findByPk(id)
    if(!existingUser) {
        return res.status(400).json({ error: 'Username does not exist' });
    }
    try {
        await db.User.destroy({ where: { id } });
          res.status(200).json({ error: 'User Deleted' });

    } catch (error) {
        return res.status(400).json({ error: 'Could not delete' });
    }
}

export {
    deleteUser
};