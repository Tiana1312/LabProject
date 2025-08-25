import { Request, Response } from "express";
import { AuthService } from "@/services";
import {AppError} from "@/errors";

export class AuthController{
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    } 

    async signUp(req: Request, res: Response) {
        try { 
            const staff = await this.authService.signUp(req.body);
            res.status(201).json(staff);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message:error.message
                });
            }
            res.status(500).json({message: "Something went wrong"});
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }
            res.status(500).json({message: "Something went wrong"});
        }
    }
}


