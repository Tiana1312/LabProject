import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from "typeorm";

import { TestSample, TestResult } from "@/entities"

import { Gender, LabStaffRole } from "@/shared/enum"

@Entity({ name: "lab_staff" })
export class LabStaff {
    @PrimaryGeneratedColumn ("uuid")
    id! : string;

    @Column({ type: "varchar", name: "first_name", nullable: false })
    firstName!: string;

    @Column({ type: "varchar", name: "last_name", nullable: false })
    lastName!: string;

    @Column({ type: "varchar", nullable: false })
    email!: string;

    @Column({ type: "integer", name: "phone_number", nullable: true })
    phoneNumber!: number | null;

    @Column( { type: "varchar", nullable: true } )
    address!: string | null;

    @Column ( { type: "enum", enum: Gender, default: Gender.OTHER, nullable: true } )
    gender!: Gender | null;

    @Column( { type: "enum", enum: LabStaffRole, default: LabStaffRole.TECHNOLOGIST, nullable: false } )
    role!: LabStaffRole;

    @Column( { type: "varchar", nullable: false, unique: true, name: "employee-id"} )
    employeeId!: string;

    @Column( {type: "boolean", default: true, name: "is-active", nullable: false })
    isActive!: boolean;

    @OneToMany ( () => TestSample, (testSample) => testSample.labStaff)
    testSamples!: TestSample[]; 

    @OneToMany ( () => TestResult, (testResult) => testResult.labStaff)
    testResults!: TestResult[]; 

    @CreateDateColumn({ type: "timestamptz", name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz", name: "updated_at", default: () => "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @DeleteDateColumn({ type: "timestamptz", name: "deleted_at", nullable: true })
    deletedAt?: Date | null
}