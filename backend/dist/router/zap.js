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
const middleware_1 = __importDefault(require("../middleware"));
const types_1 = require("../types");
const db_1 = require("../db");
const zapRouter = express_1.default.Router();
zapRouter.post("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.zapData.safeParse(body);
    if (!parsedData.success) {
        res.json({ message: "Failed to create a zap" });
        return;
    }
    try {
        const zapId = yield db_1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            //@ts-ignore
            const id = req.id;
            const zap = yield tx.zap.create({
                data: {
                    userId: parseInt(id),
                    triggerId: "",
                    actions: {
                        create: parsedData.data.actions.map((x, index) => ({
                            actionId: x.availableActionId,
                            sortingOrder: index
                        }))
                    }
                }
            });
            const trigger = yield tx.trigger.create({
                data: {
                    triggerId: parsedData.data.availableTriggerId,
                    zapId: zap.id
                }
            });
            yield db_1.prismaClient.zap.update({
                where: {
                    id: zap.id
                },
                data: {
                    triggerId: trigger.id
                }
            });
        }));
        res.json({ message: "Zap created successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
zapRouter.get("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
    const zaps = yield db_1.prismaClient.zap.findMany({
        where: {
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    res.json({ zaps });
}));
zapRouter.get("/:zapId", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;
    const zaps = yield db_1.prismaClient.zap.findFirst({
        where: {
            id: zapId,
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    res.json({ zaps });
}));
exports.default = zapRouter;
