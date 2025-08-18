import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from "typeorm";

import { TestResults } from "@/entities"

import { Gender, LabStaffRole } from "@/shared"

@Entity( { name: "lab_staffs" } )
export class LabStaffs {
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

    @Column ( { type: "enum", enum: Gender, nullable: true } )
    gender!: Gender | null;

    @Column( { type: "enum", enum: LabStaffRole, default: LabStaffRole.TECHNOLOGIST, nullable: false } )
    labStaffRole!: LabStaffRole;

    @Column( {type: "boolean", default: true, name: "is_active", nullable: false })
    isActive!: boolean;

    @Column( { type: "varchar", nullable: false } )
    password!: string;

    @OneToMany ( () => TestResults, (testResult) => testResult.testDoneBy)
    testDone!: TestResults[]; 

    @OneToMany ( () => TestResults, (testResult) => testResult.resultPreparedBy)
    resultPrepared!: TestResults[]; 

    @CreateDateColumn({ type: "timestamptz", name: "created_at", default: () => "now()" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
    updatedAt!: Date;

    @DeleteDateColumn({ type: "timestamptz", name: "deleted_at", nullable: true })
    deletedAt!: Date | null
}