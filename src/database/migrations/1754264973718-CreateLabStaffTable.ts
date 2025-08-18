import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLabStaffTable1754264973718 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE gender_enum AS ENUM ( 'MALE', 'FEMALE', 'OTHER' )
            `);

        await queryRunner.query(`
            CREATE TYPE lab_staff_role_enum AS ENUM ('CHIEF_TECHNOLOGIST', 'SENIOR_TECHNOLOGIST', 'TECHNOLOGIST', 
            'LAB_ASSISTANT' );
            `);

        await queryRunner.query(`
            CREATE TABLE lab_staffs (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            first_name VARCHAR NOT NULL,
            last_name VARCHAR NOT NULL,
            email VARCHAR NOT NULL,
            phone_number VARCHAR,
            address VARCHAR,
            gender gender_enum,
            role lab_staff_role_enum NOT NULL, 
            is_active BOOLEAN NOT NULL DEFAULT true,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ,
            deleted_at TIMESTAMPTZ
            );
        `);
    };

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE IF EXISTS lab_staff`);

        await queryRunner.query(`DROP TYPE IF EXISTS lab_staff_role_enum`);

        await queryRunner.query(`DROP TYPE IF EXISTS gender_enum`);  
    }
}