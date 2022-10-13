import { Request, Response } from 'express';
import db from '../models/index';

export const index = async (req: Request, res: Response) => {
  res.send('organization ctrl');
};

export const readDetails = async (_req: Request, res: Response) => {
  try {
    const organizations = await db.Organization.findOne({
      attributes: { exclude: ['id', 'welcomeText', 'createdAt', 'updatedAt', 'deletedAt', 'aboutUsText', 'email'] },
      include: { model: db.Slide, attributes: { exclude: ['organizationId', 'createdAt', 'updatedAt'] } },
      order: [[db.Slide, 'order', 'ASC']],
    });
    return res.status(200).json({ message: organizations, status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error, status: 500 });
  }
};

export const update = async (req: Request, res: Response) => {
  const [organization] = await db.Organization.findAll();
  const data = {
    name: req.body.name || organization.name,
    address: req.body.address || organization.address,
    phone: req.body.phone || organization.phone,
    image: req.body.image || organization.image,
    email: req.body.email || organization.email,
    welcomeText: req.body.welcomeText || organization.welcomeText,
    aboutUsText: req.body.aboutUsText || organization.aboutUsText,
  };
  try {
    await db.Organization.update(data, { where: { id: organization.id } });
    const newOrganization = await db.Organization.findOne();
    return res.status(200).json({ message: newOrganization?.toJSON(), status: 200 });
  } catch (error) {
    return res.status(500).json({ message: 'Could not update', status: 500 });
  }
};

export default {
  index,
  readDetails,
  update,
};
