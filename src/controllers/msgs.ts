import { Request, Response, NextFunction, request } from "express";
import { messagetable } from "../models/messages";

export const sendmsg = async (req: any, res: Response, next: NextFunction) => {
  const user = req.user;
  const message: string = req.body.message;
  const username: string = req.user.name;
  user.createMessage({ message: message, Username: username }).then(() => {
    res.sendStatus(200);
  });
};
export const getmessages = async (req: Request, res: Response) => {
  messagetable
    .findAll()
    .then((msgs) => {
      res.json(msgs);
    })
    .catch((err) => console.log(err));
};