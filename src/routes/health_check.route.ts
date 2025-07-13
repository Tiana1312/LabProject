import { Router } from "express"
import { healthCheckController } from "../controllers/health_check.controller";

const router = Router();

router.get("/health", healthCheckController);

export default router;