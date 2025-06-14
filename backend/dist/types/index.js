"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapData = exports.signinData = exports.signupData = void 0;
const zod_1 = __importDefault(require("zod"));
// Define all the types used in the application using Zod
exports.signupData = zod_1.default.object({
    username: zod_1.default.string().min(5),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string()
});
exports.signinData = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string()
});
exports.zapData = zod_1.default.object({
    availableTriggerId: zod_1.default.string(), // The ID of the trigger to be used
    triggerMetaData: zod_1.default.any().optional(), // Optional metadata for the trigger
    actions: zod_1.default.array(zod_1.default.object({
        availableActionId: zod_1.default.string(),
        actionMetaData: zod_1.default.any().optional()
    }))
});
