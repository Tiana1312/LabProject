import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Sample } from "@/entities"

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fullName!: string;

    @Column()
    email!: string;

    @Column()
    phoneNumber!: string;

    @Column( { nullable: true } )
    address?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany ( () => Sample, (sample) => sample.client)
    samples!: Sample[];
}

