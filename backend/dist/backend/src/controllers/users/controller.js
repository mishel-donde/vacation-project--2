"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
const user_1 = require("../../models/user");
async function getAllUsers(req, res, next) {
    try {
        const users = await user_1.User.findAll({
            attributes: { exclude: ["password"] }, // כדי לא להדליף סיסמאות
        });
        res.json(users);
    }
    catch (e) {
        next(e);
    }
}
