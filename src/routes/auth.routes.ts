import {Router, Request, Response} from "express";
import {AuthController} from "@/controllers";
import {authMiddleware} from "@/middlewares";
import {authorizeRoles} from "@/utils";

const authController = new AuthController();

export const loginRoutes = Router();
loginRoutes.post("/login", (req: Request, res: Response) => authController.login(req, res));

export const signUpRoutes = Router();
signUpRoutes.post("/signUp", authMiddleware, authorizeRoles(["CHIEF_TECHNOLOGIST"]), 
(req: Request, res: Response) => authController.signUp(req, res));