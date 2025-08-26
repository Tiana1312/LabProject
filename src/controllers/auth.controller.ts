import {Request, Response} from "express";
import {AuthService} from "@/services";
import {AppError} from "@/errors";
import {loginValidation} from "@/validations";
import {ApiResponse} from "@/utils";

export class AuthController{
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    } 

    async signUp(req: Request, res: Response) {
        try { 
            const staff = await this.authService.signUp(req.body);
            return ApiResponse.success(res, staff, "Staff registered successfully");

        } catch (error) {
            if (error instanceof AppError) {
                return ApiResponse.error(res, error.message, 500)
            }
            return ApiResponse.error(res, "Failed to register staff", 500)
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            loginValidation(email, password);
            const result = await this.authService.login(email, password);
            return ApiResponse.success(res, result, "Login successful");

        } catch (error) {
            if (error instanceof AppError) {
                return ApiResponse.error(res, error.message, error.statusCode)
            }
            res.status(500).json({message: "Something went wrong"});
        }
    }
}


