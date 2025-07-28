import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { TestSample, UUID } from "@/entities"

@Entity({ name: "test_result"})
export class TestResult {
    @PrimaryGeneratedColumn("uuid")
    id!: UUID;

    @Column({ type: "varchar", name: "test_done", nullable: false, length: 100 })
    testDone!: string;

    @Column({ type: "jsonb", name: "sample_result", nullable: false })
    sampleResult!: Record<string, any>;

    @Column({ type: "varchar", name: "test_done_by", nullable: true, length: 25 })
    testDoneBy!: string | null

    @Column({ type: "varchar", name: "result_prepared_by", nullable: false, length: 25 })
    resultPreparedBy!: string;

    @Column({ type: "timestamptz", name: "date_analyzed", nullable: false })
    dateAnalyzed!: Date;

    @ManyToOne ( () => TestSample, (testSample) => testSample.testResults, { 
        nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "sample_id", referencedColumnName: "id" })
    testSample!: TestSample;

    @CreateDateColumn({ type: "timestamptz", name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz", name: "updated_at", default: () => "CURRENT_TIMESTAMP", nullable: true})
    updatedAt!: Date | null

    @DeleteDateColumn({ type: "timestamptz", name: "deleted_at", nullable: true })
    deletedAt?: Date | null
}
