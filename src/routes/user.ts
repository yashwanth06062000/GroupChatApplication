import express from "express";
import * as userControllers from "../controllers/user"


const router = express.Router();
router.post("/signupUser",userControllers.signupUser)
