import { Router, Request, Response } from "express";
import { HealthCheckController } from "@/controllers";
import { HealthCheckService } from "@/services";

const router = Router();

const healthCheckService = new HealthCheckService() 
const healthCheckController = new HealthCheckController(healthCheckService); 

router.get("/health-check", (req: Request, res: Response) => healthCheckController.getStatus(req, res));

export default router;