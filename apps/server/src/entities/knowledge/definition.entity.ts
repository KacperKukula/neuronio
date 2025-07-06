import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Course } from '@/entities/courses/course.entity';

@Entity({
    schema: 'knowledge',
    name: 'definitions'
})
export class Definition {
    @ManyToOne(() => Course)
    @JoinColumn({ name: 'courseId' })
    course: Course;

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    keyword: string;

    @Column({ nullable: false })
    definition: string;
}