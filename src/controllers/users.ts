
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
          res.status(200).json({ message: 'User Deleted' });

    } catch (error) {
        return res.status(400).json({ error: 'Could not delete' });
    }
}

async function updateUser(req:Request, res: Response) {
    const id = req.params.id;
    const {firstName, lastName, photo} = req.body;
    
    const existingUser = await db.User.findByPk(id)
    if(!existingUser) {
        return res.status(404).json({ message: 'Username does not exist', status: 404 });
    }
   
    const updateData= {
        firstName: firstName || existingUser.firstName,
        lastName: lastName || existingUser.lastName,
        photo: photo || existingUser.photo
    }

    try {
        await db.User.update(updateData,{
            where: { id }
        })
        const userModified = await db.User.findByPk(id,{
            attributes: {exclude: ["password"],},
        })
        res.status(200).json( {message: userModified?.toJSON(), status: 200} );
        
    } catch (error) {
        return res.status(500).json({ message: 'Could not delete', status: 500 });
    }
}

export {
    deleteUser,
    updateUser
};