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
  try {
    const id = req.params.id;
    let destroy = await db.Testimonial.destroy({ where: { id: id } });
    if(!destroy) return res.status(404).json({status: 404, message: "Testimonial not found"});
    return res.status(200).json({status: 200, message: "Testimonial deleted"});
  } catch (error) {
    res.status(500).json(error);
  }
}

export default {
  create,
  deletetestimonial
};
