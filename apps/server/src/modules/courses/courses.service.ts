import { Course } from "@/entities/courses/course.entity";
import { Module } from "@/entities/courses/module.entity";
import { User } from "@/entities/user/user.entity";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CreateCourseDto } from "shared";
import { Repository } from "typeorm";

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private coursesRepository: Repository<Course>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async createCourses(courseDto: CreateCourseDto): Promise<Course> {
        const owner = await this.userRepository.findOne({ where: { id: courseDto.owner } });
        const participants = await this.userRepository.findByIds(courseDto.participants);

        const course = new Course();
        course.name = courseDto.name;
        course.description = courseDto.description;
        course.owner = owner;
        course.participants = participants;
        return await this.coursesRepository.save(course);
    }

    async getCoursesList(userId: number): Promise<Course[]> {
        return await this.coursesRepository.find({
            where: { owner: { id: userId } },
            relations: ["owner", "participants"],
        }); 
    }

    async createModule(body: object) {
        const module = plainToClass(Module, body);
        return await this.coursesRepository.save(module);
    }
}