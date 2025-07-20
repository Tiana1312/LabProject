import { Request, Response } from "express";
import { HealthCheckService } from "@/services";

export class HealthCheckController {
    private healthCheckService: HealthCheckService;

    constructor(healthCheckService: HealthCheckService) {
        this.healthCheckService = healthCheckService;
    } 
    
    getStatus (req: Request, res: Response) {
        const message = 
        this.healthCheckService.getStatus();
        return res.status(200).json({message});
    }    
};

