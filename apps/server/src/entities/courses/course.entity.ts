import {
    Entity,
    OneToOne,
    Column,
    ManyToOne,
    ManyToMany,
    PrimaryGeneratedColumn,
    JoinTable,
    OneToMany,
} from 'typeorm';
import { User } from '@/entities/user/user.entity';
import { Module } from '@/entities/courses/module.entity';

@Entity({
    schema: 'courses',
    name: 'courses'
})
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @ManyToOne(() => User)
    owner: User;

    @ManyToMany(() => User)
    @JoinTable({ name: 'participants' })
    participants: User[];

    @OneToMany(() => Module, module => module.course)
    modules: Module[];
}