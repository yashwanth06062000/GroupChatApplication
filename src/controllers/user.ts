import { Request, Response, NextFunction, request } from "express";
import jwttoken from "jsonwebtoken";


import bcrypt from "bcrypt";

import Users from "../models/users";

export async function signupUser(req: Request, res: Response, next: NextFunction) {
  const name: string = req.body.name;
  const email: string = req.body.email;
  const phone: string = req.body.phone;
  const password: string = req.body.password;
  const hashpassword: string = await bcrypt.hash(password, 10);
  var existinguser = undefined;
  await Users.findAll({ where: { name: name, email: email } })
    .then((s) => {
      if (s[0]) {
        existinguser = s[0];
      }
    })
    .catch((err) => console.log(err));
  if (existinguser == undefined) {
    Users.create({
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
  await Users.findAll({ where: {email: email } })
  .then((user)=>{
    console.log(user[0])
  })
  .catch((e)=>{
    res.sendStatus(400).json({message:"User not Found"})
  })




}


