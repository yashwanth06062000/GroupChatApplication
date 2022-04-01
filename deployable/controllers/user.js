"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signupUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var users_1 = require("../models/users");
function generateAccessTocken(id) {
    return jsonwebtoken_1.default.sign(id, '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611');
}
function signupUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var name, email, phone, password, hashpassword, existinguser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("i am here in the controllers>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                    name = req.body.name;
                    email = req.body.email;
                    phone = req.body.phone;
                    password = req.body.password;
                    return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                case 1:
                    hashpassword = _a.sent();
                    existinguser = undefined;
                    return [4 /*yield*/, users_1.usertable.findAll({ where: { name: name, email: email } })
                            .then(function (s) {
                            if (s[0]) {
                                existinguser = s[0];
                            }
                        })
                            .catch(function (err) { return console.log(err); })];
                case 2:
                    _a.sent();
                    if (existinguser == undefined) {
                        users_1.usertable.create({
                            name: name,
                            email: email,
                            phone: phone,
                            password: hashpassword,
                        })
                            .then(function (result) {
                            res.json({ message: "User Created Successfully" });
                        })
                            .catch(function (err) { return console.log(err); });
                    }
                    else {
                        res.json({ message: "User already exists please login" });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.signupUser = signupUser;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, password;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    password = req.body.password;
                    return [4 /*yield*/, users_1.usertable.findAll()
                            .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var passworddb;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        passworddb = user[0].password;
                                        return [4 /*yield*/, bcrypt_1.default.compare(password, passworddb, function (err, response) {
                                                return __awaiter(this, void 0, void 0, function () {
                                                    var jwttoken;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!err) return [3 /*break*/, 1];
                                                                res.json({ success: false, message: "you entered wrong password" });
                                                                return [3 /*break*/, 3];
                                                            case 1: return [4 /*yield*/, generateAccessTocken(user[0].id)];
                                                            case 2:
                                                                jwttoken = _a.sent();
                                                                res.json({ success: true, Accesstoken: jwttoken });
                                                                _a.label = 3;
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                });
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (e) {
                            res.sendStatus(400).json({ message: "User not Found" });
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
