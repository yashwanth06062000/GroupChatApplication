import sequelize1 from "../utils/db"
import {DataTypes} from "@sequelize/core"
export const usertable= sequelize1.define('Users',{
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
    name:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    password:{
        type:DataTypes.STRING(128),
        allowNull:false
    }


})