import { Request, Response, NextFunction, request } from "express";
import { messagetable } from "../models/messages";
import {Op} from "sequelize";

export const sendmsg = async (req: any, res: Response, next: NextFunction) => {
  const user = req.user;
  const message: string = req.body.message;
  const username: string = req.user.name;
  user.createMessage({ message: message, Username: username }).then(() => {
    res.sendStatus(200);
  });
};
export const getmessages = async (req: any, res: Response) => {
  const id:any=req.query.id
 messagetable
    .findAll({where:{msgid:{[Op.gte]:id}}})
    .then((msgs) => {
      res.json(msgs);
    })
    .catch((err) => console.log(err));
};
