import { Router } from "express";
import healthCheckRoutes from "./health-check.route";
import authRoutes from "./auth.routes";
import staffRoutes from "./staff.routes"

const router = Router();

router.use("/", healthCheckRoutes);
router.use("/auth", authRoutes);
router.use("/staff", staffRoutes);

export default router;