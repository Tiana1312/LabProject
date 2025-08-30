import {Request, Response} from "express";
import {AuthService} from "@/services";
import {AppError} from "@/errors";
import {loginValidation} from "@/validations";
import {ApiResponse} from "@/utils";
import {ILogin} from "@/shared"

export class AuthController{
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    } 

    async signUp(req: Request, res: Response) {
        try { 
            const staff = await this.authService.signUp(req.body);

            return ApiResponse.success(res, {data: staff}, 201);

        } catch (error) {
            if (error instanceof AppError) {
                return ApiResponse.error(res, error.message)
            }

            return ApiResponse.error(res, "Failed to register staff", 500)
        }
    }

    async login(req: Request, res: Response) {
        try {
            const loginData: ILogin = req.body;

            loginValidation(loginData);

            const result = await this.authService.login(loginData);

            return ApiResponse.success(res, result, 200);

        } catch (error) {
            if (error instanceof AppError) {
                return ApiResponse.error(res, error.message, error.statusCode)
            }
            console.error("Login error:", error);
            return ApiResponse.error(res, "Something went wrong", 500)
        }
    }
}


