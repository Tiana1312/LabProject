import { Router } from "express";
import { HealthCheckController } from "@/controllers";
import { HealthCheckService } from "@/services";

const router = Router();

const healthCheckService = new HealthCheckService() //creating the service
const healthCheckController = new HealthCheckController (healthCheckService); //passing it into the controller

router.get("/health-check", healthCheckController.getStatus.bind(healthCheckController));

export default router;