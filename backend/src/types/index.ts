import zod from "zod"

// Define all the types used in the application using Zod
export const signupData = zod.object({
    username: zod.string().min(5),
    password: zod.string().min(6),
    name: zod.string()
})

export const signinData = zod.object({
    username: zod.string(),
    password: zod.string()
})

export const zapData = zod.object({
    availableTriggerId: zod.string(), // The ID of the trigger to be used
    triggerMetaData: zod.any().optional(), // Optional metadata for the trigger
    actions: zod.array(zod.object({ // Each action in the zap
        availableActionId: zod.string(),
        actionMetaData: zod.any().optional(),
    }))
})