import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { AppDataSource } from "@/database";
import { LabStaffs } from "@/entities";
import { LabStaffRole } from "@/shared";

export class AuthService {
    private staffRepository = AppDataSource.getRepository(LabStaffs);

    async signUp (staffData: Partial<LabStaffs>) {

        const existingEmail = await this.staffRepository.findOne({
            where: {email: staffData.email}
        });

        if (!staffData.email || !staffData.password) {
            throw new Error ("Email and password are required");
        }

        if (existingEmail) {
                throw new Error ("Email already exists")
            }
        const hashedPassword = await bcrypt.hash(staffData.password!, 10)

        const newStaff = this.staffRepository.create({
            ...staffData,
            password: hashedPassword,
            labStaffRole: LabStaffRole.LAB_ASSISTANT,
        });

        const savedStaff = await this.staffRepository.save(newStaff);

        const { password, ...staffWithoutPassword } = savedStaff;
        return staffWithoutPassword;
    }

    async login ( email: string, password: string ) {
        const staffLogin = await this.staffRepository.findOne( { where: { email } } );
        if (!staffLogin) {
            throw new Error ("Invalid email or password");
        }

        const isMatch = await bcrypt.compare ( password, staffLogin.password );
        if (!isMatch) {
            throw new Error("Incorrect password");
        }

        const payload = {
            id: staffLogin.id, 
            role: staffLogin.labStaffRole,
        };

        const token = jwt.sign (payload, process.env.JWT_SECRET as string, {expiresIn: "15minutes"}
        );

        return { token };
    }
}