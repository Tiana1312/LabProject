import { Router } from "express";
import healthCheckRoutes from "./health-check.route";

const router = Router();

router.use("/", healthCheckRoutes)

export default router