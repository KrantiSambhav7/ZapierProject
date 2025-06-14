"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
exports.JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // This means that if the environment variable is not set, it will use a default value. Make sure to change this in production.
