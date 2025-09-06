import {Request, Response, NextFunction} from "express";
import {JWT} from "@/config";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
    interface Request {
        user: {id: number, role: string}
    }
}

export async function authMiddleware(req: Request, res:Response, next: NextFunction){
        try{
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")){
                return res.status(401).json({message: "Authorization token required"});
            }

            const token = authHeader.split( " " ) [1];

            const decodedToken = jwt.verify(token, JWT.secret) as {
                id: number;
                role: string;
            };

            req.user = {
                id: decodedToken.id, 
                role: decodedToken.role, 
            };

            next();

        } catch (error: any) {
            console.error("Auth.error:", error);

            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Session expired please log in again" });
            }

            if (error.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid token" });
            }
            
            return res.status(500).json({ message: "Authentication failed" });
        }
    }