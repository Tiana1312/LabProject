import { Request, Response } from "express";
import { AuthService } from "@/services";

export class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    } 

    async signUp (req: Request, res: Response) {
        try { 
            const staff = await this.authService.signUp(req.body);
            res.json(staff);
        } catch (err:any) {
            res.status(400).json({err:err.message});
        }
    }

    async login (req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await this.authService.login(email, password);
            res.json(token);
        } catch (err: any) {
            res.status(400).json({err: err.message});
        }
    }
}


