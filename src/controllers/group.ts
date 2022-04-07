import { Request, Response, NextFunction, request } from "express";
import { messagetable } from "../models/messages";
import { Op } from "sequelize";
import { grouptable } from "../models/groups";
import { usergroups } from "../models/usergroups";
import { usertable } from "../models/users";

export const creategroup = async function (req: any, res: Response) {
  const gpname = req.body.groupname;
  await grouptable.create({
    groupname: gpname,
  });
  grouptable
    .findAll({ where: { groupname: gpname } })
    .then((group: any) => {
      const gid = group[0].id;
      const uid = req.user.id;
      usergroups
        .create({
          is_admin: true,
          GroupId: gid,
          UserId: uid,
        })
        .then(() => {
          res.json({ success: "true" });
        });
    })
    .catch((err) => console.log(err));
};
export const getgroups = async function (req: any, res: Response) {
  const uid = req.user.id;
  let gpids: any = [];
  usergroups
    .findAll({ where: { UserId: uid } })

    .then((groups: any) => {
      for (let i = 0; i < groups.length; i++) {
        gpids.push(groups[i].GroupId);
      }
      grouptable
        .findAll({ where: { id: { [Op.or]: gpids } } })
        .then((usergroups) => {
          res.json({ usergps: usergroups });
        });
    })
    .catch((err) => console.log(err));
};

export const addusertogroup = async function (req: any, res: Response) {
  const uid = req.user.id;
  const newuser = req.body.addingemail;
  const gid = req.body.groupid;
  const makeadmin = req.body.makeadmin;
  var adduserid: any;
  usertable
    .findAll({ where: { email: newuser } })
    .then((adduser: any) => {
      adduserid = adduser[0].id;
    })
    .catch((err) => {
      res.json({ message: "usernotfound" });
    });

  usergroups
    .findAll({ where: { UserId: uid, GroupId: gid } })

    .then((user: any) => {
      if (user[0].is_admin) {
        if (makeadmin == "on") {
          usergroups.create({
            is_admin: true,
            GroupId: gid,
            UserId: adduserid,
          });
        } else {
          usergroups.create({
            is_admin: false,
            GroupId: gid,
            UserId: adduserid,
          });
        }
      }
      res.json({ success: "true" });
    })
    .catch((err) => console.log(err));
};

export const removeuserfromgroup = async function (req: any, res: Response) {
  const uid = req.user.id;
  const rmuser = req.body.rmemail;
  const gid = req.body.rmgroupid;
  var rmuserid: any;
  usertable
    .findAll({ where: { email: rmuser } })
    .then((adduser: any) => {
      rmuserid = adduser[0].id;
    })
    .catch((err) => {
      res.json({ message: "usernotfound" });
    });
  usergroups
    .findAll({ where: { UserId: uid, GroupId: gid } })

    .then((user: any) => {
      if (user[0].is_admin) {
        usergroups.destroy({where:{
          GroupId: gid,
          UserId: rmuserid,
        }}).then(()=>{
            res.json({message:"success"})
        })
      }
    })
    .catch((err) => console.log(err));
};
