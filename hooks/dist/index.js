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
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/hooks/catch/:userId/:zapId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params["userId"]; // User ID is not used in this example, but could be used for authorization or logging
    const zapId = req.params["zapId"]; // This is the ID of the Zap that the webhook is associated with
    const body = req.body;
    // We want when the user will hit the hooks endpoint, then the entry must be stored in the DB as well as in a queue 
    // But here we use a Transactional Outbox pattern. 
    // Any random user cannot hit the webhook directly as we share the passwords with the user. 
    // When we create a Zap and then make a trigger in it then we will get a Webhook URL which is handled by this endpoint.
    // This URL will be stored in any external service and then they will hit this URL with the data. 
    // So when the req comes we will then start to execute this.
    // Here we will create a ZapRun and then create a ZapRunOutbox entry. Two tables are being created here. Outbox table is used to store the data that will be processed later by a worker or a queue system because it is easy to achieve atomicity in DBs.
    yield client.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const run = yield tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body // Each trigger will have some metadata, so we store it here 
            }
        });
        yield tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        });
        res.json({
            message: "Webhook created"
        });
    }));
}));
app.listen(3000);
