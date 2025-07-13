import { Request, Response } from "express";
import { HealthCheckService } from "../services/health_check.service";

const healthCheckService = new HealthCheckService();

export const healthCheckController = 
(req: Request, res: Response) => {
    const status = 
    healthCheckService.getStatus();
    res.json(status)
};

