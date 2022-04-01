import sequelize1 from "../utils/db";
import { DataTypes } from "@sequelize/core";
export const messagetable= sequelize1.define("messages", {
  msgid: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  Username: {
    type: DataTypes.STRING(128),
    allowNull: false,
  }
  ,
  message: {
    type: DataTypes.STRING(128),
    allowNull: false,
  }
});
