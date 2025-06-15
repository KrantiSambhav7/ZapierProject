import express from "express"
import authmiddleware from "../middleware";
import { zapData } from "../types";
import { prismaClient } from "../db";
const zapRouter = express.Router();

// Create a new zap
zapRouter.post("/", authmiddleware, async(req, res) => {
    const body = req.body;
    const parsedData = zapData.safeParse(body);

    if (!parsedData.success) {
        res.json({ message: "Failed to create a zap" });
        return;
    }

    try {
        const zapId = await prismaClient.$transaction(async tx => {
            //@ts-ignore
            const id = req.id ;
            const zap = await tx.zap.create({ // Create a new zap with the userId and triggerId.
                data: {
                    userId: parseInt(id),
                    triggerId: "",
                    actions: {
                        create: parsedData.data.actions.map((x , index) => ({ // Create actions in the zap.
                            actionId: x.availableActionId,
                            sortingOrder: index
                        }))
                    }
                }
            })
            const trigger = await tx.trigger.create({ // In one to one relationships we will create the zap first and then the trigger needs to be created otherwise there is a problem. 
                data: {
                    triggerId: parsedData.data.availableTriggerId,
                    zapId : zap.id
                }
            });
            await prismaClient.zap.update({ // Update the zap with the trigger id.
                where:{
                    id: zap.id
                },
                data:{
                    triggerId: trigger.id
                }
            })
        })

        res.json({ message: "Zap created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
    res.json({ message: "Zap created successfully" });
});


zapRouter.get("/" ,authmiddleware, async(req , res) => {
    //@ts-ignore
    const id = req.id;
    const zaps = await prismaClient.zap.findMany({
        where: {
            userId: id
        },
        include: {
            actions:{
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
    })
    res.json({zaps})
})

zapRouter.get("/:zapId" ,authmiddleware, async(req , res) => {
        //@ts-ignore
        const id = req.id;
        const zapId = req.params.zapId;
        const zaps = await prismaClient.zap.findFirst({
            where: {
                id: zapId,
                userId: id
            },
            include: {
                actions:{
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
        })
        res.json({zaps})
})

export default zapRouter