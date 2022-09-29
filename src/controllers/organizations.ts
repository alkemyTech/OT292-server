import { Request, Response } from 'express';
import db from '../models/index';

export const getOrganizationData = async (_req: Request, res: Response) => {
  try {
    const organizations = await db.Organization.findOne({ attributes: { exclude: ['id', 'welcomeText', 'createdAt', 'updatedAt', 'deletedAt', 'aboutUsText', 'email'] } });
    return res.status(200).json({ message: organizations, status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error, status: 500 });
  }
};

