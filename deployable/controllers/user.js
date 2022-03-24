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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
function signupUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        var existinguser = undefined;
        yield users_1.default.findAll({ where: { name: name, email: email } })
            .then((s) => {
            if (s[0]) {
                existinguser = s[0];
            }
        })
            .catch((err) => console.log(err));
        if (existinguser == undefined) {
            users_1.default.create({
                name: name,
                email: email,
                phone: phone,
                password: hashpassword,
            })
                .then((result) => {
                res.json({ message: "User Created Successfully" });
            })
                .catch((err) => console.log(err));
        }
        else {
            res.json({ message: "User already exists please login" });
        }
    });
}
exports.signupUser = signupUser;
