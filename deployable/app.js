"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var db_1 = __importDefault(require("./utils/db"));
var user_1 = require("./routes/user");
var authenticate = __importStar(require("./controllers/auth"));
var msgs_1 = require("./routes/msgs");
var users_1 = require("./models/users");
var messages_1 = require("./models/messages");
users_1.usertable.hasMany(messages_1.messagetable);
messages_1.messagetable.belongsTo(users_1.usertable);
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(user_1.userrouter);
app.use("*", authenticate.auth);
app.use(msgs_1.msgrouter);
db_1.default.sync()
    .then(function () { app.listen(3000); })
    .catch(function (err) { return console.log(err); });
// Ask yash bhaiya
// first cors error
//second one request user is not working hence  i added the interface for request and extended  Requests
//Importing that interfacemethods
//findall method returns user but unable to access the user properties
