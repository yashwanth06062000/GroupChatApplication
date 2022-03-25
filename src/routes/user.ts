import express from "express";
import * as userControllers from "../controllers/user"


export const userrouter = express.Router();
userrouter.post("/signupUser",userControllers.signupUser)
userrouter.post("/login",userControllers.login)


