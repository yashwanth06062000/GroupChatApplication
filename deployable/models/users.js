"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usertable = void 0;
var db_1 = __importDefault(require("../utils/db"));
var core_1 = require("@sequelize/core");
exports.usertable = db_1.default.define('Users', {
    id: {
        type: core_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: core_1.DataTypes.STRING(128),
        allowNull: false
    },
    email: {
        type: core_1.DataTypes.STRING(128),
        allowNull: false
    },
    phone: {
        type: core_1.DataTypes.STRING(128),
        allowNull: false
    },
    password: {
        type: core_1.DataTypes.STRING(128),
        allowNull: false
    }
});
