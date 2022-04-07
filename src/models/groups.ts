import sequelize1 from "../utils/db";
import { DataTypes } from "@sequelize/core";
export const grouptable= sequelize1.define("Groups", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  groupname: {
    type: DataTypes.STRING(128),
    allowNull: false,
  }
});
