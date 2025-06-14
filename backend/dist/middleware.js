"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authmiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
function authmiddleware(req, res, next) {
    const token = req.headers.authorization;
    // Check if the token is provided in the Authorization header
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    // Remove 'Bearer ' prefix if it exists
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        if (payload) {
            //@ts-ignore
            req.id = payload.id;
        }
        next(); // Call the next middleware or route handler
    }
    catch (e) {
        res.status(401).json({ message: "Invalid token" });
    }
}
