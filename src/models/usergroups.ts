import sequelize1 from "../utils/db";
import { DataTypes } from "@sequelize/core";
export const usergroups= sequelize1.define("userGroups", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
});
