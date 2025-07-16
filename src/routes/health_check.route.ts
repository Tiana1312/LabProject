import { Router } from "express"
import { HealthCheckController } from "@/controllers";

const router = Router();
const healthCheckController = new HealthCheckController

router.get("/health-check", healthCheckController.getStatus);

export default router;