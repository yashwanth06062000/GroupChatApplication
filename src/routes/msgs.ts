import express from "express";
import  * as messagecontroller from "../controllers/msgs"


export const msgrouter = express.Router();
msgrouter.post("/sendmsg",messagecontroller.sendmsg)
msgrouter.get("/getmessages",messagecontroller.getmessages)
msgrouter.get("/getgroupmessages",messagecontroller.getgroupmessages)

