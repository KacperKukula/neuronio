import { Courses } from "@/entities/courses/courses.entity";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CreateCourseDto } from "shared";
import { Repository } from "typeorm";

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Courses)
        private coursesRepository: Repository<Courses>
    ) {}

    async createCourses(courseDto: CreateCourseDto): Promise<Courses> {
        const errors = await validate(courseDto);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        const course = plainToClass(Courses, courseDto);
        return await this.coursesRepository.save(course);
    }

    async getCoursesList(userId: number) {
        return this.coursesRepository.find({  })
    }
}