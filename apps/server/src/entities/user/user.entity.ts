import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
    ADMIN = "admin",
    CREATOR = "creator",
    STUDENT = "student"
}

@Entity({ schema: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    password: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.STUDENT
    })
    roles: string;
}