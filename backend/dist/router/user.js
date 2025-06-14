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
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
const middleware_1 = __importDefault(require("../middleware"));
const types_1 = require("../types");
const index_1 = require("../db/index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.signupData.safeParse(req.body);
    // Validate the request body using Zod
    if (!parsedData.success) {
        res.status(404).json({
            message: "Hello"
        });
        return;
    }
    // First check if the user already exists. 
    const userExist = yield index_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    });
    if (userExist) {
        res.json({
            message: "Already Signed up"
        });
        return;
    }
    // If the user does not exist, create a new user
    yield index_1.prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    });
    // Respond with a success message
    res.json({
        message: "User has been created"
    });
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.signinData.safeParse(req.body);
    // Validate the request body using Zod
    if (!parsedData.success) {
        res.status(404).json({
            message: "Hello"
        });
        return;
    }
    // Check if the user exists with the provided credentials. Search by email and password
    const user = yield index_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    });
    if (!user) {
        res.json({
            message: "Incorrect User"
        });
        return;
    }
    // If the user exists, create a JWT token and send it back to the user
    const token = jsonwebtoken_1.default.sign({
        id: user.id
    }, config_1.JWT_SECRET);
    res.json({ token: token });
}));
userRouter.get("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id; // Get the user ID from the request object, which is set by the authmiddleware
    const user = yield index_1.prismaClient.user.findFirst({
        where: {
            id: id
        },
        select: {
            name: true,
            email: true
        }
    });
    res.json({ user });
}));
exports.default = userRouter;
