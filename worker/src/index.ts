 import { Kafka } from "kafkajs"
 const topic = "quickstart-events"

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
});

// Here we create a consumer that will read messages from the topic
// and process them one by one, committing the offset after each message.

 async function main(){
    const consumer = kafka.consumer({
        groupId: 'main-worker'
    }); 
    await consumer.connect(); // Connect to the Kafka broker
    await consumer.subscribe({topic: 'quickstart-events' , fromBeginning: true}) // Subscribe to the topic from which we want to consume messages
    await consumer.run({ 
        autoCommit:false, // We will commit the offset manually after processing each message. This is for manual acknowledgment of message processing.
        eachMessage: async ({topic , partition , message }) => { // This function will be called for each message in the topic
            // Here we can process the message
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString()
            })
            await new Promise(r => setTimeout(r , 1000)); // Simulate some processing time to process the message
            await consumer.commitOffsets([{ // When the message is processed, we commit the offset to mark it as processed
                // This will ensure that the next time we consume messages, we will not consume the same message again
                topic: 'quickstart-event',
                partition: partition,
                offset: (parseInt(message.offset) + 1).toString() // We need to commit the next offset, not the current one. But why +1? Because Kafka offsets are zero-based, so if we processed offset 0, we need to commit offset 1. It means we are acknowledging that we have processed the message at offset 0.
            }])
        }
    })
 }
 main()

