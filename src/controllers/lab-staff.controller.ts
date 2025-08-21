import { Request, Response } from "express";
import { StaffService } from "@/services";
import { LabStaffRole } from "@/shared";

export class StaffController {
    constructor (private staffService: StaffService) {
        this.staffService = new StaffService();
    }
    async createStaff (req: Request, res: Response): Promise<void> {
        try{
            const currentUserRole = req.user.role as LabStaffRole;
            const labStaffData = req.body;

            const newStaff = await this.staffService.createStaff(currentUserRole, labStaffData);
            return res.status(201).json({
                message: "lab staff created successfully",
                data: newStaff,
            });
        } catch (error: any) {
            res.status(400).json({
                message: error.message
            });
        }
    }
}