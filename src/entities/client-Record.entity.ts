import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from "typeorm";

import { TestSample } from "@/entities"

@Entity( { name: "client_record" } )
export class ClientRecord {
    @PrimaryGeneratedColumn( "uuid" )
    id!: string;

    @Column({ type: "varchar", name: "first_name", nullable: false })
    firstName!: string;

    @Column({ type: "varchar", name: "last_name", nullable: false })
    lastName!: string;

    @Column({ type: "varchar", nullable: false })
    email!: string;

    @Column({ type: "integer", name: "phone_number", nullable: false })
    phoneNumber!: number;

    @Column( { type: "varchar", nullable: true } )
    address!: string | null;

    @OneToMany ( () => TestSample, (testSample) => testSample.clientRecord)
    testSamples!: TestSample[];

    @CreateDateColumn({ type: "timestamptz", name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz", name: "updated_at", default: () => "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @DeleteDateColumn({ type: "timestamptz", name: "deleted_at", nullable: true })
    deletedAt!: Date | null

}


