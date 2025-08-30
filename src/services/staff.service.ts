import bcrypt from "bcrypt"
import { AppDataSource } from "@/database";
import { LabStaffs } from "@/entities";
import { LabStaffRoleEnum } from "@/shared";
import {CreateError} from "@/errors";

export class LabStaffService{
    private staffRepository = AppDataSource.getRepository(LabStaffs);

    async createStaff(currentUserRole: LabStaffRoleEnum, staffData: Partial<LabStaffs>): 
    Promise<Omit<LabStaffs, "password" >> {
        
        if (currentUserRole !== LabStaffRoleEnum.CHIEF_TECHNOLOGIST) {
            throw CreateError.forbidden("Only chief technologist can create staff");
        }

        if (!staffData.email) {
            throw CreateError.validation("Email is required");
        }

        if (!staffData.password) {
            throw CreateError.validation("Password is required");
        }

        const existingEmail = await this.staffRepository.findOne({
            where: { email: staffData.email} });
            if (existingEmail) {
                throw CreateError.validation("Email already exists");
            }

        const hashedPassword = await bcrypt.hash(staffData.password!, 10);

        const newStaff = this.staffRepository.create({
            ...staffData,
            password: hashedPassword,    
        });
        const savedStaff = await this.staffRepository.save(newStaff);

        const { password, ...staffWithoutPassword } = savedStaff;
        return staffWithoutPassword;        
    }
}