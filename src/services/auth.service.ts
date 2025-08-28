import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { AppDataSource } from "@/database";
import { LabStaffs } from "@/entities";
import {CreateError} from "@/errors"
import { IjwtPayload, IApiResponse, ILogin } from "@/shared";
import {SECONDS_IN_7_DAYS, JWT} from "@/config";

export class AuthService {
    private staffRepository = AppDataSource.getRepository(LabStaffs);
    async signUp(staffData: Partial<LabStaffs>): Promise<{id: string, message: string}>{

        const existingEmail = await this.staffRepository.findOne({
            where: {email: staffData.email}
        });

        if (existingEmail) {
            throw CreateError.validation("Email already exists")
            }

        if (!staffData.email || !staffData.password) {
            throw CreateError.validation("Email and password are required");
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

    async login({email, password}: ILogin): Promise<IApiResponse<string>>{
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

        return { data: token };
    }
}