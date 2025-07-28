import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from "typeorm";

import { TestSample, UUID } from "@/entities"

@Entity({ name: "client_record"})
export class ClientRecord {
    @PrimaryGeneratedColumn("uuid")
    id!: UUID;

    @Column({ type: "varchar", name: "full_name", nullable: false, length: 25 })
    fullName!: string;

    @Column({ type: "varchar", nullable: false, length: 150 })
    email!: string;

    @Column({ type: "integer", name: "phone_number", nullable: false })
    phoneNumber!: number;

    @Column( { type: "varchar", nullable: true, length: 150 } )
    address!: string | null;

    @OneToMany ( () => TestSample, (testSample) => testSample.clientRecord)
    testSamples!: TestSample[];

    @Column({ type: "integer", name: "phone_number", nullable: false })
    @CreateDateColumn({ type: "timestamptz", name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz", name: "updated_at", default: () => "CURRENT_TIMESTAMP", nullable: true})
    updatedAt!: Date | null

    @DeleteDateColumn({ type: "timestamptz", name: "deleted_at", nullable: true })
    deletedAt?: Date | null

}


