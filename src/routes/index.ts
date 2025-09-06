import { Router } from "express";
import healthCheckRoutes from "./health-check.route";
import authRoutes from "./auth.routes";
import staffRoutes from "./staff.routes";
import {authMiddleware} from "@/middlewares";

const router = Router();

router.use("/auth", authRoutes);

router.use(authMiddleware);

router.use("/health-check", healthCheckRoutes);

router.use("/staff", staffRoutes);

export default router;