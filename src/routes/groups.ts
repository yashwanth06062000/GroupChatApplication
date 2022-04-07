import express from "express";
import  * as groupscontroller from "../controllers/group"


export const grouprouter = express.Router();
grouprouter.post("/creategroup",groupscontroller.creategroup)
grouprouter.get("/getgroups",groupscontroller.getgroups)
grouprouter.post("/addusertogroup",groupscontroller.addusertogroup)
grouprouter.post("/removeuserfromgroup",groupscontroller.removeuserfromgroup)
