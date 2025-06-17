import express from "express"
const userRouter = express.Router();
import  authmiddleware  from "../middleware";
import { signinData , signupData } from "../types";
import {prismaClient} from "../db/index"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";
import { Router } from "express";

const triggerRouter = Router();

triggerRouter.get("/available" , async(req , res) =>{
    const availableTriggers = await prismaClient.availableTrigger.findMany({});
    res.json({availableTriggers})
})

export default triggerRouter;