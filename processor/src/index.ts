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
            take: 10 // Take out 10 at a time from the outbox table 
        })
        pendingZaps.forEach(item => {
            producer.send({
                topic: 'quickstart-events',
                messages: pendingZaps.map(item => ({ // Create a message for each zap run
                        value: item.zapRunId // This will make a new array with only value as one of the field. 
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