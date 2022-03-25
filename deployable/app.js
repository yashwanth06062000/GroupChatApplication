"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./utils/db"));
const user_1 = require("./routes/user");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(user_1.userrouter);
db_1.default.sync()
    .then(() => { app.listen(3000); })
    .catch(err => console.log(err));
