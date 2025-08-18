import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
    OneToMany
} from "typeorm";

import { ClientRecords, TestResults } from "@/entities"

import { SampleStatus } from "@/shared"

@Entity({ name: "test_samples"})
export class TestSamples {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", name: "sample_type", nullable: false })
    sampleType!: string;

    @Column({ type: "timestamptz", name: "collection_date", nullable: false })
    collectionDate!: Date;

    @Column({ type: "enum", enum: SampleStatus, default: SampleStatus.PENDING, name: "sample_status", nullable: false })
    sampleStatus!: SampleStatus

    @Column({ type: "timestamptz", name: "processed_date", nullable: true })
    processedDate!: Date;

    @Column( { type: "text", nullable: true } )
    description!: string | null

    @ManyToOne ( () => ClientRecords, (clientRecord) => clientRecord.testSamples, 
    {nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({ name: "client_record_id", referencedColumnName: "id" })
    clientRecord!: ClientRecords;

    @OneToMany ( () => TestResults, (testResult) => testResult.testSample) 
    testResults!: TestResults[];

    @CreateDateColumn({ type: "timestamptz", name: "created_at", default: () => "now()" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
    updatedAt!: Date;

    @DeleteDateColumn({ type: "timestamptz", name: "deleted_at", nullable: true })
    deletedAt!: Date | null
}