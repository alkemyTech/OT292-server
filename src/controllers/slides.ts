import { Request,Response } from "express";
import db from '../models/index';
import {generateToken} from '../utils/jwt.handle';

export const slideDetail = async (req:Request,res:Response) => {
    try{
        const slide = await db.Slide.findByPk(req.params.id);
        if(!slide) return res.status(404).json({message : 'Slide not found '});
        return res.status(200).json(slide);
    }catch(error){
        return res.status(500).json(error);
    }
}



export const slideDelete = async (req:Request,res:Response) => {
    try{
         const slide  = await db.Slide.findByPk(req.params.id);
         if(!slide) return res.status(404).json({message : 'Slide not found'})
         return res.status(200).json({message : 'Slide delete successful',slide});
    }catch(error){
        return res.status(500).json(error);
    }
}