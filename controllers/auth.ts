import { Request, Response, NextFunction, request } from "express";

import jwt from "jsonwebtoken";

import {usertable} from "../models/users"



// interface userauth extends Request {
//     user:any
//   }

export async function auth(req:any,res:Response,next:NextFunction){
    try {
        if(req.header("authorization")){
                    const token:string = req.header('authorization')!
        console.log("in 18",token)
        const userId = Number(jwt.verify(token, '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'))
        console.log("in 20")
       await usertable.findByPk(userId)
       .then((user)=>{
        
            req.user =user
        next()
        }).catch(err=>console.log(err))}
        else{
            next()
        }
        
    }catch(err) {
        console.log(err)
        return res.status(404).json({message: 'from authentication', success: false})
    }

}

