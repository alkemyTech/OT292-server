import { Request, Response } from 'express';
import db from '../models/index';



export const getNewById = async (req:Request,res:Response) => {
    try{
      const newById = await db.News.findByPk(req.params.id);
      return res.status(200).json(newById);
    }catch(error){
       return res.status(500).json(error);
    }
}


