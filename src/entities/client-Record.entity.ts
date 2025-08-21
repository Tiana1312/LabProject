import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from "typeorm";

import { TestSamples } from "@/entities"

@Entity( { name: "client_records" } )
export class ClientRecords {

    @PrimaryGeneratedColumn( "uuid" )
    id!: string;

    @Column({ type: "varchar", name: "first_name", nullable: false })
    firstName!: string;

    @Column({ type: "varchar", name: "last_name", nullable: false })
    lastName!: string;

    @Column({ type: "varchar", nullable: false })
    email!: string;

    @Column({ type: "varchar", name: "phone_number", nullable: false })
    phoneNumber!: string;

    @Column( { type: "varchar", nullable: true } )
    address!: string | null;

    @OneToMany ( () => TestSamples, (testSample) => testSample.clientRecord)
    testSamples!: TestSamples[];

    @CreateDateColumn({ type: "timestamptz", name: "created_at", default: () => "now()" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })

    updatedAt!: Date;

    @DeleteDateColumn({ type: "timestamptz", name: "deleted_at", nullable: true })
    deletedAt!: Date | null

}


