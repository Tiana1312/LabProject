import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTestSampleTable1754243136393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`
            CREATE TYPE sample_status_enum AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'REJECTED')
            `);

        await queryRunner.query(`
            CREATE TABLE test_samples (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            sample_type VARCHAR NOT NULL,
            collection_date TIMESTAMPTZ NOT NULL,
            sample_status sample_status_enum NOT NULL DEFAULT 'PENDING',
            processed_date TIMESTAMPTZ,
            description TEXT,
            client_record_id UUID NOT NULL,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ,
            deleted_at TIMESTAMPTZ,
            CONSTRAINT fk_client_record FOREIGN KEY (client_record_id) REFERENCES client_records(id) 
            ON DELETE CASCADE ON UPDATE CASCADE
            );
        `);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query( `DROP TABLE IF EXISTS test_sample` );

        await queryRunner.query(`DROP TYPE IF EXISTS sample_status_enum`);
    }
}
