import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { AppDataSource } from "@/database";
import { LabStaffs } from "@/entities";
import { LabStaffRole } from "@/shared";
import {tokenConfig} from "@/config/config";
import {CreateError} from "@/errors"

export class AuthService {
    private staffRepository = AppDataSource.getRepository(LabStaffs);

    async signUp(staffData: Partial<LabStaffs>): Promise<Omit<LabStaffs, "password">>{

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
            labStaffRole: LabStaffRole.LAB_ASSISTANT,
        });

        const savedStaff = await this.staffRepository.save(newStaff);

        const {password, ...staffWithoutPassword} = savedStaff;
        return staffWithoutPassword as Omit<LabStaffs, "password">
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

        interface jwtPayload{
            id: string,
            role: LabStaffRole
        }
        const payload: jwtPayload = {
            id: staffLogin.id, 
            role: staffLogin.labStaffRole,
        };

        const token = jwt.sign(payload, tokenConfig.jwt_Secret, {expiresIn: "604800 seconds"}
        );

        return { token };
    }
}