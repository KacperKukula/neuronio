import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
}