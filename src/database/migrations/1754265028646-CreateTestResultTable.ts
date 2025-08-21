import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTestResultTable1754265028646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE test_results(
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), 
            test_completed BOOLEAN NOT NULL DEFAULT false,
            sample_result JSONB NOT NULL,
            date_analyzed TIMESTAMPTZ NOT NULL,
            test_sample_id UUID NOT NULL,
            test_done_by UUID,
            result_prepared_by UUID NOT NULL,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ,
            deleted_at TIMESTAMPTZ,
            CONSTRAINT fk_test_sample FOREIGN KEY (test_sample_id) REFERENCES test_samples(id) ON DELETE CASCADE ON UPDATE CASCADE, 
            CONSTRAINT fk_test_done_by FOREIGN KEY (test_done_by) REFERENCES lab_staffs(id) ON DELETE SET NULL ON UPDATE CASCADE,
            CONSTRAINT fk_result_prepared_by FOREIGN KEY (result_prepared_by) REFERENCES lab_staffs(id) ON DELETE CASCADE ON UPDATE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query (`DROP TABLE IF EXISTS test_result`);
    }
}