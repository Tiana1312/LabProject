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

    @Column({ type: "varchar", name: "test_done_by", nullable: true })
    testDoneBy!: string | null

    @Column({ type: "varchar", name: "result_prepared_by", nullable: false })
    resultPreparedBy!: string;

    @Column({ type: "timestamptz", name: "date_analyzed", nullable: false })
    dateAnalyzed!: Date;

    @ManyToOne ( () => TestSample, (testSample) => testSample.testResults, { 
        nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "test_sample_id", referencedColumnName: "id" })
    testSample!: TestSample;

    @ManyToOne ( () => LabStaff, (labStaff) => labStaff.testResults, { 
        nullable: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "lab_staff_id", referencedColumnName: "id" })
    labStaff!: LabStaff | null;

    @CreateDateColumn({ type: "timestamptz", name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz", name: "updated_at", default: () => "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @DeleteDateColumn({ type: "timestamptz", name: "deleted_at", nullable: true })
    deletedAt?: Date | null
}
