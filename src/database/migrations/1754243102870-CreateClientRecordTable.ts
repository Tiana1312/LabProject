import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClientRecordTable1754243102870 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.query(`
            CREATE TABLE client_records (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            first_name VARCHAR NOT NULL,
            last_name VARCHAR NOT NULL,
            email VARCHAR NOT NULL,
            phone_number VARCHAR NOT NULL,
            address VARCHAR,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ,
            deleted_at TIMESTAMPTZ
            );
        `);
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`DROP TABLE IF EXISTS client_record`);
    }
}
