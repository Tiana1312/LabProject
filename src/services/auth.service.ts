import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { AppDataSource } from "@/database";
import { LabStaffs } from "@/entities";
import {JWT} from "@/config/config";
import {CreateError} from "@/errors"
import { IjwtPayload } from "@/shared";
import {SECONDS_IN_7_DAYS} from "@/config/config";

export class AuthService {
    private staffRepository = AppDataSource.getRepository(LabStaffs);
    async signUp(staffData: Partial<LabStaffs>): Promise<{id: string, message: string}>{

        const existingEmail = await this.staffRepository.findOne({
            where: {email: staffData.email}
        });

        if (!staffData.email || !staffData.password) {
            throw CreateError.validation("Email and password are required");
        }

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
    }

    async login(email: string, password: string): Promise<{token: string}>{
        const staffLogin = await this.staffRepository.findOne({where: {email}});
        if (!staffLogin) {
            throw CreateError.unauthorized("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, staffLogin.password);
        if (!isMatch) {
            throw CreateError.unauthorized("Incorrect email or password");
        }

        const payload: IjwtPayload = {
            id: staffLogin.id, 
            role: staffLogin.labStaffRole,
        };

        const token = jwt.sign(payload, JWT.secret, {expiresIn: SECONDS_IN_7_DAYS});

        return { token };
    }
}