import express from "express";
import bodyparser from "body-parser";
import cors from "cors";




import db from "./utils/db"
import {userrouter as userRoutes} from "./routes/user"
import * as authenticate from "./controllers/auth"
import {msgrouter} from "./routes/msgs";



import {usertable as user}  from "./models/users"
import {messagetable as msg} from "./models/messages"
user.hasMany(msg)
msg.belongsTo(user)

const app=express()
app.use(cors())
app.use(bodyparser.json())
app.use(userRoutes)
app.use("*",authenticate.auth)
app.use(msgrouter)





db.sync()
.then(()=>{app.listen(3000)})
.catch(err=>console.log(err))

// Ask yash bhaiya
// first cors error
//second one request user is not working hence  i added the interface for request and extended  Requests
//Importing that interfacemethods
//findall method returns user but unable to access the user properties