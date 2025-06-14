import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function authmiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization as string | undefined;

    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }

    try {
        const payload = jwt.verify(token, "SecretPasword") as { id: string };
        // @ts-ignore
        req.id = payload.id;
        next();
    } catch (e) {
        res.status(401).json({ message: "Invalid token" });
    }
}
