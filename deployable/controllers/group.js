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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeuserfromgroup = exports.addusertogroup = exports.getgroups = exports.creategroup = void 0;
var sequelize_1 = require("sequelize");
var groups_1 = require("../models/groups");
var usergroups_1 = require("../models/usergroups");
var users_1 = require("../models/users");
var creategroup = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var gpname;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gpname = req.body.groupname;
                    return [4 /*yield*/, groups_1.grouptable.create({
                            groupname: gpname,
                        })];
                case 1:
                    _a.sent();
                    groups_1.grouptable
                        .findAll({ where: { groupname: gpname } })
                        .then(function (group) {
                        var gid = group[0].id;
                        var uid = req.user.id;
                        usergroups_1.usergroups
                            .create({
                            is_admin: true,
                            GroupId: gid,
                            UserId: uid,
                        })
                            .then(function () {
                            res.json({ success: "true" });
                        });
                    })
                        .catch(function (err) { return console.log(err); });
                    return [2 /*return*/];
            }
        });
    });
};
exports.creategroup = creategroup;
var getgroups = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var uid, gpids;
        return __generator(this, function (_a) {
            uid = req.user.id;
            gpids = [];
            usergroups_1.usergroups
                .findAll({ where: { UserId: uid } })
                .then(function (groups) {
                var _a;
                for (var i = 0; i < groups.length; i++) {
                    gpids.push(groups[i].GroupId);
                }
                groups_1.grouptable
                    .findAll({ where: { id: (_a = {}, _a[sequelize_1.Op.or] = gpids, _a) } })
                    .then(function (usergroups) {
                    res.json({ usergps: usergroups });
                });
            })
                .catch(function (err) { return console.log(err); });
            return [2 /*return*/];
        });
    });
};
exports.getgroups = getgroups;
var addusertogroup = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var uid, newuser, gid, makeadmin, adduserid;
        return __generator(this, function (_a) {
            uid = req.user.id;
            newuser = req.body.addingemail;
            gid = req.body.groupid;
            makeadmin = req.body.makeadmin;
            users_1.usertable
                .findAll({ where: { email: newuser } })
                .then(function (adduser) {
                adduserid = adduser[0].id;
            })
                .catch(function (err) {
                res.json({ message: "usernotfound" });
            });
            usergroups_1.usergroups
                .findAll({ where: { UserId: uid, GroupId: gid } })
                .then(function (user) {
                if (user[0].is_admin) {
                    if (makeadmin == "on") {
                        usergroups_1.usergroups.create({
                            is_admin: true,
                            GroupId: gid,
                            UserId: adduserid,
                        });
                    }
                    else {
                        usergroups_1.usergroups.create({
                            is_admin: false,
                            GroupId: gid,
                            UserId: adduserid,
                        });
                    }
                }
                res.json({ success: "true" });
            })
                .catch(function (err) { return console.log(err); });
            return [2 /*return*/];
        });
    });
};
exports.addusertogroup = addusertogroup;
var removeuserfromgroup = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var uid, rmuser, gid, rmuserid;
        return __generator(this, function (_a) {
            uid = req.user.id;
            rmuser = req.body.rmemail;
            gid = req.body.rmgroupid;
            users_1.usertable
                .findAll({ where: { email: rmuser } })
                .then(function (adduser) {
                rmuserid = adduser[0].id;
            })
                .catch(function (err) {
                res.json({ message: "usernotfound" });
            });
            usergroups_1.usergroups
                .findAll({ where: { UserId: uid, GroupId: gid } })
                .then(function (user) {
                if (user[0].is_admin) {
                    usergroups_1.usergroups.destroy({ where: {
                            GroupId: gid,
                            UserId: rmuserid,
                        } }).then(function () {
                        res.json({ message: "success" });
                    });
                }
            })
                .catch(function (err) { return console.log(err); });
            return [2 /*return*/];
        });
    });
};
exports.removeuserfromgroup = removeuserfromgroup;
