import { Controller, Get, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Couses } from '@/entities/courses/courses.entity';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Get()
    getCourses(): string {
        return 'Hello from courses';
    }
}