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
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.signupData.safeParse(req.body);
    if (!parsedData.success) {
        res.status(404).json({
            message: "Hello"
        });
        return;
    }
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
    yield index_1.prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    });
    res.json({
        message: "User has been created"
    });
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.signinData.safeParse(req.body);
    if (!parsedData.success) {
        res.status(404).json({
            message: "Hello"
        });
        return;
    }
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
    const token = jsonwebtoken_1.default.sign({
        id: user.id
    }, "SecretPassword");
    res.json({ token: token });
}));
userRouter.get("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
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
