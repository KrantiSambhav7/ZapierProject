import express from "express"
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
const app = express();
app.use(express.json())

app.post("/hooks/catch/:userId/:zapId" , async(req , res) => {
    const userId = req.params["userId"]; // User ID is not used in this example, but could be used for authorization or logging
    const zapId = req.params["zapId"]; // This is the ID of the Zap that the webhook is associated with
    const body = req.body;
    await client.$transaction(async tx => {
        const run = await tx.zapRun.create({
            data:{
                zapId: zapId,
                metadata: body
            }
        })
        await tx.zapRunOutbox.create({
            data:{
                zapRunId: run.id
            }
        })
        res.json({
            message: "Webhook created"
        })
    })
})

app.listen(3000) 