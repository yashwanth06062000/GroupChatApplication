import express from "express";
import bodyparser from "body-parser";
import sequelize from "sequelize";



import db from "./utils/db"
import {userrouter as userRoutes} from "./routes/user"

const app=express()
app.use(bodyparser.json())
app.use(userRoutes)
db.sync()
.then(()=>{app.listen(3000)})
.catch(err=>console.log(err))


