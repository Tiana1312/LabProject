import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertChiefTechnologist1755331547402 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO lab_staffs (
            id, 
            first_name,
            last_name,
            email,
            phone_number,
            address,
            gender,
            lab_staff_role,
            is_active,
            created_at,
            updated_at
            )
            VALUES (
            uuid_generate_v4(),
            'Chief',
            'Technologist',
            'chief.technologist@lab.com',
            NULL,
            NULL,
            NULL,
            'Chief Technologist',
            true,
            NOW(),
            NOW()
            );
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM lab_staffs WHERE email = 'chief.technologist@lab.com' AND lab_staff_role = 'Chief Technologist';
        `);
    }
}
