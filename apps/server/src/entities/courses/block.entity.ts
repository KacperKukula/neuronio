import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

enum BlockType {
    TEXT = "text",
    VIDEO = "video",
}

@Entity({ schema: 'courses' })
export class Block {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    order: number;

    @Column({ nullable: false })
    name: string;

    @Column({
        type: 'json',
        nullable: false,
    })
    data: string;

    @Column({
        type: "enum",
        enum: BlockType,
        nullable: false
    })
    type: string;

    @ManyToOne(() => Course, (course) => course.blocks)
    course: Course
}