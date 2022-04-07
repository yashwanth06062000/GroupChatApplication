"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usergroups = void 0;
var db_1 = __importDefault(require("../utils/db"));
var core_1 = require("@sequelize/core");
exports.usergroups = db_1.default.define("userGroups", {
    id: {
        type: core_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    is_admin: {
        type: core_1.DataTypes.BOOLEAN,
        allowNull: false,
    }
});
