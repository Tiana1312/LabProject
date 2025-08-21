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

import { TestSamples, LabStaffs } from "@/entities"

@Entity({ name: "test_results"})
export class TestResults {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "boolean", default: false, name: "test_completed", nullable: false })
    testCompleted!: boolean;

    @Column({ type: "jsonb", name: "sample_result", nullable: false })
    sampleResult!: Record<string, any>;

    @Column({ type: "timestamptz", name: "date_analyzed", nullable: false })
    dateAnalyzed!: Date;

    @ManyToOne ( () => TestSamples, (testSample) => testSample.testResults, { 
        nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "test_sample_id", referencedColumnName: "id" })
    testSample!: TestSamples;

    @ManyToOne ( () => LabStaffs, (labStaff) => labStaff.testDone, { 
        nullable: true, onDelete: "SET NULL", onUpdate: "CASCADE" })
    @JoinColumn ({ name: "test_done_by", referencedColumnName: "id" })
    testDoneBy!: LabStaffs | null;

    @ManyToOne ( () => LabStaffs, (labStaff) => labStaff.resultPrepared, { 
        nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "result_prepared_by", referencedColumnName: "id" })
    resultPreparedBy!: LabStaffs;

    @CreateDateColumn({ type: "timestamptz", name: "created_at", default: () => "now()" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })

    updatedAt!: Date;

    @DeleteDateColumn({ type: "timestamptz", name: "deleted_at", nullable: true })
    deletedAt!: Date | null
}
