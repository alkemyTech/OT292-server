import { NextFunction, Request, Response } from 'express';
import db from '../models/index'

async function index (req: Request, res: Response) {
  res.send('Activities controller');
}
const updateActivity = async (req:Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { name, content, image} = req.body
  let activity
  try {
    activity = await db.Activity.findByPk(id);
    if(!activity) return res.status(404).json({ message: "Activity not found", status: 404 });

    if(name) activity.name = name;
    if(content) activity.content = content;
    if(image) activity.image = image;

    try {
      activity.save();
    } catch (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(activity);
  } catch (error) {
    return res.status(400).json({ error: error});
  }
  
}
export default{
  index,
  updateActivity
};
