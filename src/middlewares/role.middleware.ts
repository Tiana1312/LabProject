import {Request, Response, NextFunction} from "express";

export function authorizeRoles(allowedRoles: string[]) {
    
        return (req: Request, res: Response, next: NextFunction) => {
    
            if(!req.labStaff) {
                return res.status(401).json({message: "Not authenticated. Please log in"});
            }
    
            if(!allowedRoles.includes(req.labStaff.role)) {
                return res.status(403).json({message: "Insufficient permission level"}); 
            }
    
            next();
        };
    }    