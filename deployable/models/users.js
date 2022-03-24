"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utils/db"));
const sequelize_1 = __importDefault(require("sequelize"));
exports.default = db_1.default.define('Users', {
    userid: {
        type: sequelize_1.default.NUMBER,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    phone: {
        type: sequelize_1.default.NUMBER,
        allowNull: false
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
