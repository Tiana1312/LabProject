import { AppDataSource } from "@/database";
import { LabStaffs } from "@/entities";
import { LabStaffRole } from "@/shared";

export class StaffService {
    private staffRepository = AppDataSource.getRepository(LabStaffs);

    async createStaff ( currentUserRole: LabStaffRole, labStaffData: Partial<LabStaffs>): Promise<LabStaffs > {
        if (currentUserRole !== LabStaffRole.CHIEF_TECHNOLOGIST) {
            throw new Error ("Only chief technologist can create staff");
        }
        const newStaff = this.staffRepository.create(labStaffData);
        return await this.staffRepository.save(newStaff);
    }
}

