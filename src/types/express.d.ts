import { IjwtPayload } from "@/shared";

declare module "express-serve-static-core" { 
    interface Request { 
        labStaff: IjwtPayload 
    } 
}
