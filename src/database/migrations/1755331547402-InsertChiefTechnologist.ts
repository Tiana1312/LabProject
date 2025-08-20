import { MigrationInterface, QueryRunner } from "typeorm";
import {staffConfig} from "@/config/config";

export class InsertChiefTechnologist1755331547402 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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
            'temp1234',
            'Chief Technologist',
            true
            );
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM lab_staffs WHERE email = '${staffConfig.chiefTechnologist.email}' AND lab_staff_role = 'Chief Technologist';
        `);
    }
}
