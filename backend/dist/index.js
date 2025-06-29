"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./router/user"));
const zap_1 = __importDefault(require("./router/zap"));
const cors_1 = __importDefault(require("cors")); // npm i cors
const trigger_1 = __importDefault(require("./router/trigger"));
const action_1 = __importDefault(require("./router/action"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/zap", zap_1.default);
app.use("/api/v1/trigger", trigger_1.default);
app.use("/api/v1/action", action_1.default);
app.listen(3000);
