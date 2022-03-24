"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = new sequelize_1.Sequelize("root", "groupchat", "Thisonlyme@1", {
    dialect: 'mysql',
    host: "localhost",
});
