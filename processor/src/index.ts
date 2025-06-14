import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
})

const name = "quickstart-events";

async function main(){
    const producer = kafka.producer();
    await producer.connect();
    
    while(true){
        const pendingZaps = await client.zapRunOutbox.findMany({
            take: 10
        })
        pendingZaps.forEach(item => {
            producer.send({
                topic: 'quickstart-events',
                messages: 
                    pendingZaps.map(item => ({
                        value: item.zapRunId
                    }))
            })
        })
        await client.zapRunOutbox.deleteMany({
            where:{
                id: {
                    in: pendingZaps.map(r => r.id)
                }
            }
        });
    }
}

main();