import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { AppDataSource } from "@/database";
import { LabStaffs } from "@/entities";
import {AppError, CreateError} from "@/errors"
import { IApiResponse, ILogin, ISignUp, IjwtPayload } from "@/shared";
import {SECONDS_IN_7_DAYS, JWT} from "@/config";

export class AuthService {
    
    private staffRepository = AppDataSource.getRepository(LabStaffs);

    async signUp(staffData: ISignUp): Promise<{id: string, message: string}>{
        try{
            const existingEmail = await this.staffRepository.findOne({
            where: {email: staffData.email},
            });
            
            if (existingEmail) {
            throw CreateError.validation("Email already exists")
            }

            const hashedPassword = await bcrypt.hash(staffData.password!, 10)

            const newStaff = this.staffRepository.create({
            ...staffData,
            password: hashedPassword,
            });

            const savedStaff = await this.staffRepository.save(newStaff);

            return {
                id: savedStaff.id, 
                message: `Staff with name ${savedStaff.firstName} ${savedStaff.lastName} has been created successfully`
            };
        } catch (error: any) {
            console.error("SignUp error:", error);
            
            if (error instanceof AppError) {
                throw error;
            }

            if (error.code === "23505") {
                throw new AppError("Email alreadt exists", 400)
            }

            if (error.code && error.code.startsWith("23")){
                throw new AppError("Database error", 500);
            }

            throw new AppError("Something went wrong", 500);
        }
    }

    async login(loginData: ILogin): Promise<IApiResponse<string>>{
        try {
            const { email, password } = loginData
            
            const staff = await this.staffRepository.findOne({where: {email}});
            
            if (!staff) {
            throw CreateError.unauthorized("Invalid email or password");
            }

            const isMatch = await bcrypt.compare(password, staff.password);

            if (!isMatch) {
                throw CreateError.unauthorized("Incorrect email or password");
            }

            const payload: IjwtPayload = {
                id: staff.id, 
                role: staff.role,
            };

            const token = jwt.sign(payload, JWT.secret, {expiresIn: SECONDS_IN_7_DAYS});

            return { data: token };

        } catch(error) {
            console.error("Login error:", error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Login failed", 500);
        }
    }
}