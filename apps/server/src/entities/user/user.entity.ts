import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserProfile } from './userProfile.entity';

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

    @Column({ nullable: true })
    photoUrl: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.STUDENT
    })
    role: string;

    @OneToOne(() => UserProfile)
    @JoinColumn()
    profile: UserProfile;
}