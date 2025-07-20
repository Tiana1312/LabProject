import { Router } from "express";
import { HealthCheckController } from "@/controllers";
import { HealthCheckService } from "@/services";

const router = Router();

const healthCheckService = new HealthCheckService() 
const healthCheckController = new HealthCheckController (healthCheckService); 

router.get("/health-check", healthCheckController.getStatus.bind(healthCheckController));

export default router;