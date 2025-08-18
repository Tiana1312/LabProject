import { MigrationInterface, QueryRunner } from "typeorm";
import config from "@/config";
const { env } = config;

export class InsertChiefTechnologist1755331547402 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO lab_staffs ( 
            first_name,
            last_name,
            email,
            phone_number,
            address,
            lab_staff_role,
            is_active
            )
            VALUES (
            '${env.chiefTechnologistFirstName}',
            '${env.chiefTechnologistLastName}',
            '${env.chiefTechnologistEmail}',
            NULL,
            NULL,
            'Chief Technologist',
            true
            );
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM lab_staffs WHERE email = '${env.chiefTechnologistEmail}' AND lab_staff_role = 'Chief Technologist';
        `);
    }
}
