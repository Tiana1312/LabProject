import {Router, Request, Response} from "express";
import {StaffController} from "@/controllers";

const router = Router();
const staffController = new StaffController();

router.post("/create-staff", (req: Request, res: Response) => staffController.createStaff(req, res));

export default router;