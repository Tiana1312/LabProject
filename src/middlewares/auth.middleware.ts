import {Request, Response, NextFunction} from "express";
import {JWT} from "@/config";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { LabStaffs } from "@/entities";

declare module "express-serve-static-core" {
    interface Request {
        labStaff: Pick<LabStaffs, "id" | "role">
    }
}

export async function authMiddleware(req: Request, res:Response, next: NextFunction){
        try{
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")){
                return res.status(401).json({message: "Authorization token required"});
            }

            const token = authHeader.split( " " ) [1];

            const decodedToken = jwt.verify(token, JWT.secret) as Pick<LabStaffs, "id" | "role">;

            req.labStaff = decodedToken;

            next();

        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return res.status(401).json({ message: "Session expired, please log in again" });
            }

            if (error instanceof JsonWebTokenError) {
                return res.status(401).json({ message: "Invalid token" });
            }
            
            return res.status(500).json({ message: "Authentication failed" });
        }
    }