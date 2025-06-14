import express from "express"
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
const app = express();
app.use(express.json())

app.post("/hooks/catch/:userId/:zapId" , async(req , res) => {
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
    await client.$transaction(async tx => {
        const run = await tx.zapRun.create({ // This is the ZapRun entry that will be created for this webhook call
            data:{
                zapId: zapId,
                metadata: body
            }
        })
        await tx.zapRunOutbox.create({ // This is the outbox entry that will be processed later by a worker or a queue system
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