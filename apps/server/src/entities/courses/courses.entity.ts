import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '@/entities/user/user.entity';

@Entity({ schema: 'courses' })
export class Courses {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 10, unique: true, nullable: false })
    code: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    // @Column({ nullable: false })
    // @ManyToOne(() => User, user => user.id)
    // owner: number;
}