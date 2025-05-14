import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Courses } from '@/entities/courses/courses.entity';
import { CreateCourseDto } from 'shared';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Get()
    getCourses(): string {
        return 'Hello from courses';
    }

    @Post('create')
    createCourses(@Body() course: CreateCourseDto): Promise<Courses> {
        return this.coursesService.createCourses(course);
    }

    @Get('list/:id')
    getCoursesList(@Param('id') id: number): Promise<Courses[]> {
        return this.coursesService.getCoursesList(id);
    }
}