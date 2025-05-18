import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'user' })
export class UserProfile {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    surname: string;

    @Column({ nullable: true })
    bio: string;

    @Column({ nullable: true })
    position: string;

    @Column({ nullable: true })
    hobbies: string;
}