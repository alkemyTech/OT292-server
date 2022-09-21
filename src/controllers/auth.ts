import express, { Response, Request } from "express";
import { body, ValidationChain, validationResult } from 'express-validator';


// const login = (
//     body('email').isEmail(),
//     ( req : Request, res : Response ) => {
//         res.send({message: 'Hello world'});
//     }); 

const login = (
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log("BBODYY",req.body)
        console.log(errors)
        

        res.send('Controller')
        }
    )



export default {login}


