import { Request, Response } from "express";
import { LabStaffService } from "@/services";

export class StaffController {
    private labStaffService: LabStaffService;
    constructor () {
        this.labStaffService = new LabStaffService();
    }
    async createStaff (req: Request, res: Response) {
        try {
            const currentUserRole = req.body.currentUserRole;

            const labStaffData = req.body;

            const newStaff = await this.labStaffService.createStaff(currentUserRole, labStaffData);

            res.status(201).json(newStaff);

        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}