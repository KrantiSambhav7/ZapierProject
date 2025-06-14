import zod from "zod"

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
    availableTriggerId: zod.string(),
    triggerMetaData: zod.any().optional(),
    actions: zod.array(zod.object({
        availableActionId: zod.string(),
        actionMetaData: zod.any().optional()
    }))
})