import { Request, Response, NextFunction, request } from "express";
import jwt from "jsonwebtoken";


import bcrypt from "bcrypt";

import {usertable} from "../models/users";


function generateAccessTocken(id:string){
  return jwt.sign(id,'09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611')
}

export async function signupUser(req: Request, res: Response, next: NextFunction) {
  console.log("i am here in the controllers>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  const name: string = req.body.name;
  const email: string = req.body.email;
  const phone: string = req.body.phone;
  const password: string = req.body.password;
  const hashpassword: string = await bcrypt.hash(password, 10);
  var existinguser = undefined;
  await usertable.findAll({ where: { name: name, email: email } })
    .then((s) => {
      if (s[0]) {
        existinguser = s[0];
      }
    })
    .catch((err) => console.log(err));
  if (existinguser == undefined) {
    usertable.create({
      name: name,
      email: email,
      phone: phone,
      password: hashpassword,
    })
      .then((result) => {
        res.json({ message: "User Created Successfully" });
      })
      .catch((err) => console.log(err));
  }
  else{
    res.json({ message: "User already exists please login" });

  }
}
export async function login(req:Request,res:Response){
 
  const email:string=req.body.email;
  const password:string=req.body.password;
await usertable.findAll()
  .then(async (user:any)=>{
    const passworddb=user[0].password;
    await bcrypt.compare(password,passworddb,async function (err,response){
      if(err){
        res.json({success:false,message:"you entered wrong password"})
      }
      else{
        const jwttoken=await generateAccessTocken(user[0].id)
        res.json({success:true,Accesstoken:jwttoken})
      }
    })
  })
  .catch((e)=>{
    res.sendStatus(400).json({message:"User not Found"})
  })





}


