import {Request, Response, NextFunction} from "express";
import {JWT} from "@/config";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
    interface Request {
        user?: {id: number, role: string, email?: string}
    }
}

export async function authMiddleware(
    req: Request, 
    res:Response, 
    next: NextFunction){

        try{
            const authHeader = req.headers["authorization"];

            if (!authHeader || !authHeader.startsWith("Bearer ")){
                return res.status(401).json({message: "Authorization token required"});
            }

            const token = authHeader.split( " " ) [1];

            const decodedToken = jwt.verify(token, JWT.secret) as {
                id: number;
                role: string;
                email?: string;
            };

            req.user = {id: decodedToken.id, role: decodedToken.role, email: decodedToken.email};

            next();

        } catch (error) {
            console.error("Auth.error:", error);
            
            return res.status(401).json({message: "Invalid of expired token"});
        }
    }

export function authorizeRoles(...allowedRoles: string[]) {

    return (req: Request, res: Response, next: NextFunction) => {

        if(!req.user) {
            return res.status(401).json({message: "Not authenticated"});
        }

        if(!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({message: "Forbidden: Insufficient role"}); 
        }

        next();
    };
}    