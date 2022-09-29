import { Request, Response, NextFunction } from "express";
import db from '../models/index';

const create = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body, "Req total");
  const { name, content, image } = req.body;
  let newTestimonial;
  if (name || content || image) {
    try {
      newTestimonial = await db.Testimonial.create({name, content, image});
      res.status(200).send(newTestimonial);
    } catch (error) {
      res.status(500).json(error);
    }
  }else{
    res.status(400).json({message: "Not Found name or content"})
  }
};

export default {
  create,
};
