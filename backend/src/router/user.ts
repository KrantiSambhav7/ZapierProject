import express from "express"
const userRouter = express.Router();
import  authmiddleware  from "../middleware";
import { signinData , signupData } from "../types";
import {prismaClient} from "../db/index"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";

userRouter.post("/signup" , async(req , res) => {
    const parsedData = signupData.safeParse(req.body)
    // Validate the request body using Zod
    if(!parsedData.success){
        res.status(404).json({
            message: "Hello"
        })
        return;
    }
    // First check if the user already exists. 
    const userExist = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    })

    if(userExist){
        res.json({
            message: "Already Signed up"
        })
        return;
    }
    // If the user does not exist, create a new user
    await prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name 
        }
    })
    // Respond with a success message
    res.json({
        message: "User has been created"
    })
})

userRouter.post("/signin" , async(req , res) => {
    const parsedData = signinData.safeParse(req.body)
    // Validate the request body using Zod
    if(!parsedData.success){
        res.status(404).json({
            message: "Hello"
        })
        return;
    }
    // Check if the user exists with the provided credentials. Search by email and password
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })

    if(!user){
        res.json({
            message: "Incorrect User"
        })
        return;
    }
    // If the user exists, create a JWT token and send it back to the user
    const token = jwt.sign({
        id: user.id
    } , JWT_SECRET)

    res.json({token: token});
})

userRouter.get("/" , authmiddleware, async(req , res) => {
    //@ts-ignore
    const id = req.id; // Get the user ID from the request object, which is set by the authmiddleware
    const user = await prismaClient.user.findFirst({
        where: {
            id: id
        },
        select:{
            name : true,
            email: true
        }
    });
    res.json({user})
})

export default userRouter