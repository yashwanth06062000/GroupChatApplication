"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagetable = void 0;
var db_1 = __importDefault(require("../utils/db"));
var core_1 = require("@sequelize/core");
exports.messagetable = db_1.default.define("messages", {
    msgid: {
        type: core_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    Username: {
        type: core_1.DataTypes.STRING(128),
        allowNull: false,
    },
    message: {
        type: core_1.DataTypes.STRING(128),
        allowNull: false,
    }
});
