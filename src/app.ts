import express from "express";
import bodyparser from "body-parser";
import cors from "cors";




import db from "./utils/db"
import {userrouter as userRoutes} from "./routes/user"
import * as authenticate from "./controllers/auth"
import {msgrouter} from "./routes/msgs";
import{grouprouter} from "./routes/groups"



import {usertable as user}  from "./models/users"
import {messagetable as msg} from "./models/messages"
import {grouptable as groups}from "./models/groups"
import{usergroups as usergroup}from "./models/usergroups"




// Associations

user.hasMany(msg)
msg.belongsTo(user)

groups.belongsToMany(user,{through:usergroup})
user.belongsToMany(groups,{through:usergroup})

groups.hasMany(msg)
msg.belongsTo(groups)


const app=express()
app.use(cors())
app.use(bodyparser.json())
app.use(userRoutes)
app.use("*",authenticate.auth)
app.use(msgrouter)
app.use(grouprouter)





db.sync()
.then(()=>{app.listen(3000)})
.catch(err=>console.log(err))

