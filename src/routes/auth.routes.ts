import {Router, Request, Response} from "express";
import {AuthController} from "@/controllers";

const router = Router();
const authController = new AuthController();

router.post("/signUp", (req: Request, res: Response) => authController.signUp(req, res));

router.post("/login", (req: Request, res: Response) => authController.login(req, res));

export default router;