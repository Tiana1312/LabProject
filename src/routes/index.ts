import { Router } from "express";
import healthCheckRoutes from "./health-check.route";
import {loginRoutes, signUpRoutes} from "./auth.routes";
import staffRoutes from "./staff.routes";
import {authMiddleware} from "@/middlewares";

const router = Router();

router.use("/health-check", healthCheckRoutes);

router.use("/auth", loginRoutes);

router.use(authMiddleware);

router.use("/auth", signUpRoutes);

router.use("/staff", staffRoutes);

export default router;