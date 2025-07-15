import { Router } from "express"
import { HealthCheckController } from "@/controllers/health_check.controller";

const router = Router();
const healthCheckController = new HealthCheckController

router.get("/health-check", healthCheckController.getStatus);

export default router;