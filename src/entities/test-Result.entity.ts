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

import { TestSample, LabStaff } from "@/entities"

@Entity({ name: "test_result"})
export class TestResult {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "boolean", default: false, name: "test_completed", nullable: false })
    testCompleted!: boolean;

    @Column({ type: "jsonb", name: "sample_result", nullable: false })
    sampleResult!: Record<string, any>;

    @Column({ type: "timestamptz", name: "date_analyzed", nullable: false })
    dateAnalyzed!: Date;

    @ManyToOne ( () => TestSample, (testSample) => testSample.testResults, { 
        nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "test_sample_id", referencedColumnName: "id" })
    testSample!: TestSample;

    @ManyToOne ( () => LabStaff, (labStaff) => labStaff.testDone, { 
        nullable: true, onDelete: "SET NULL", onUpdate: "CASCADE" })
    @JoinColumn({ name: "test_done_by", referencedColumnName: "id" })
    testDoneBy!: LabStaff | null;

    @ManyToOne ( () => LabStaff, (labStaff) => labStaff.resultPrepared, { 
        nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "result_prepared_by", referencedColumnName: "id" })
    resultPreparedBy!: LabStaff;

    @CreateDateColumn({ type: "timestamptz", name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz", name: "updated_at", default: () => "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @DeleteDateColumn({ type: "timestamptz", name: "deleted_at", nullable: true })
    deletedAt!: Date | null
}
