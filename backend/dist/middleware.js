"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authmiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authmiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, "SecretPasword");
        // @ts-ignore
        req.id = payload.id;
        next();
    }
    catch (e) {
        res.status(401).json({ message: "Invalid token" });
    }
}
