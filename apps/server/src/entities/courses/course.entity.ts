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
import { Block } from '@/entities/courses/block.entity';

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

    @Column({ nullable: true })
    background: string;

    @ManyToMany(() => User)
    @JoinTable({ name: 'participants' })
    participants: User[];

    @OneToMany(() => Block, block => block.course)
    blocks: Block[];
}