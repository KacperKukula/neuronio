import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

enum ModuleType {
    TEXT = "text",
    VIDEO = "video",
}

@Entity({ schema: 'courses' })
export class Module {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    order: number;

    @Column({ nullable: false })
    name: string;

    @Column({
        type: "enum",
        enum: ModuleType,
        nullable: false
    })
    type: string;

    @ManyToOne(() => Course, (course) => course.modules)
    course: Course
}