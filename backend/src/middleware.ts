import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export default function authmiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization; 
    // Check if the token is provided in the Authorization header
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    // Remove 'Bearer ' prefix if it exists
    try {
        const payload = jwt.verify(token , JWT_SECRET);
        if(payload){
            //@ts-ignore
            req.id = payload.id;
        }
        next(); // Call the next middleware or route handler
    } catch (e) {
        res.status(401).json({ message: "Invalid token" });
    }

}
