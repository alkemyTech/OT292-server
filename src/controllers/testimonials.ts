import { Request, Response, NextFunction } from "express";
import db from '../models/index';

const create = async (req: Request, res: Response, next: NextFunction) => {

  const { name, content, image } = req.body;
  let newTestimonial;
    try {
      newTestimonial = await db.Testimonial.create({name, content, image});
      res.status(200).send(newTestimonial);
    } catch (error) {
      res.status(500).json(error);
    }
};
const deletetestimonial = async (req:Request, res:Response) => {

}

export default {
  create,
  deletetestimonial
};
