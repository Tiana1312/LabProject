import bcrypt from "bcrypt"
import { AppDataSource } from "@/database";
import { LabStaffs } from "@/entities";
import { LabStaffRole } from "@/shared";

export class LabStaffService {
    private staffRepository = AppDataSource.getRepository(LabStaffs);

    async createStaff ( currentUserRole: LabStaffRole, labStaffData: Partial<LabStaffs>): Promise<Omit<LabStaffs, "password" >> {
        
        if (currentUserRole !== LabStaffRole.CHIEF_TECHNOLOGIST) {
            throw new Error ("Only chief technologist can create staff");
        }

        if (!labStaffData.email) {
            throw new Error ("Email is required");
        }

        if (!labStaffData.password) {
            throw new Error ("Password is required");
        }

        const existingEmail = await this.staffRepository.findOne({
            where: { email: labStaffData.email} });
            if (existingEmail) {
                throw new Error ("Email already exists");
            }

        const hashedPassword = await bcrypt.hash(labStaffData.password!, 10);

        const newStaff = this.staffRepository.create({
            ...labStaffData,
            password: hashedPassword,    
        });
        const savedStaff = await this.staffRepository.save(newStaff);

        const { password, ...staffWithoutPassword } = savedStaff;
        return staffWithoutPassword;
    }    
}

