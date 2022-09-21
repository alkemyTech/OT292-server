import { Request, Response } from 'express';
import db from '../models/index'


export const getOrganizationData = async (req: Request, res: Response) => {
      try{
          const organizations = await db.Organization.findAll({attributes : {exclude :["id","welcomeText","createdAt","updatedAt","deletedAt","aboutUsText","email"]}})
           return res.status(200).json(organizations);
        }catch(error){
        return res.status(500).json(error);
      }
}

