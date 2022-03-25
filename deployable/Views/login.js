"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const login = document.getElementById("login");
login.addEventListener("click", (e) => {
    const emailtag = document.getElementById("email");
    const email = emailtag.value;
    const passwordtag = document.getElementById("email");
    const password = passwordtag.value;
    let logincreds = {
        email: email,
        password: password
    };
    axios_1.default
        .post("/login", logincreds)
        .then((token) => { console.log(token); })
        .catch(err => { console.log(err); });
});
