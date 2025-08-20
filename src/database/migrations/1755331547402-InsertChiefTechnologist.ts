import { MigrationInterface, QueryRunner } from "typeorm";
import {staffConfig} from "@/config/config";
import { LabStaffRole } from "@/shared"
import bcrypt from "bcrypt"

export class InsertChiefTechnologist1755331547402 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const hashedPassword = await bcrypt.hash(staffConfig.chiefTechnologist.password!, 10);
        await queryRunner.query(`
            INSERT INTO lab_staffs ( 
            first_name,
            last_name,
            email,
            phone_number,
            address,
            password,
            lab_staff_role,
            is_active
            )
            VALUES (
            '${staffConfig.chiefTechnologist.firstName}',
            '${staffConfig.chiefTechnologist.lastName}',
            '${staffConfig.chiefTechnologist.email}',
            NULL,
            NULL,
            '${hashedPassword}',
            '${LabStaffRole.CHIEF_TECHNOLOGIST}',
            true
            );
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM lab_staffs WHERE email = '${staffConfig.chiefTechnologist.email}' 
            AND lab_staff_role = '${LabStaffRole.CHIEF_TECHNOLOGIST}';
        `);
    }
}
