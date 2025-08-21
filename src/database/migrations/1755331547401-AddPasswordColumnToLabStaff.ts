import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordColumnToLabStaff1755331547401 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query (`
            ALTER TABLE lab_staffs ADD COLUMN password VARCHAR NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE lab_staffs DROP COLUMN password;
        `);
    }
}