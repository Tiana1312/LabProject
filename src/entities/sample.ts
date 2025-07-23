import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { Client } from "@/entities"

@Entity()
export class Sample {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    sampleType!: string;

    @Column()
    collectionDate!: Date;

    @Column()
    status!: string;

    @Column()
    processedDate!: Date

    @Column( { nullable: true } )
    description?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne ( () => Client, (client) => client.samples)
    client!: Client;
}

