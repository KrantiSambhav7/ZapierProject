import express from "express"
const userRouter = express.Router();
import  authmiddleware  from "../middleware";
import { signinData , signupData } from "../types";
import {prismaClient} from "../db/index"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";
import { Router } from "express";

const actionRouter = Router();

actionRouter.get("/available" , async (req , res) =>{
    const availableActions = await prismaClient.availableAction.findMany({});
    res.json({availableActions})
})

export default actionRouter;