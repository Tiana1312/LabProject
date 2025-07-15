import { Request, Response } from "express";
import { HealthCheckService } from "@/services/health_check.service";

export class HealthCheckController {
    private healthCheckService = new HealthCheckService();
    getStatus = (req: Request, res: Response) => {
        const status = 
    this.healthCheckService.getStatus();
    res.json(status)
    }    
};

