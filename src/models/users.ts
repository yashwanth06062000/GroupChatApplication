import sequelize1 from "../utils/db"
import Sequelize from "sequelize"
export default sequelize1.define('Users',{
    userid:{
        type:Sequelize.NUMBER,
        allowNull:false,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    phone:{
        type:Sequelize.NUMBER,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }


})