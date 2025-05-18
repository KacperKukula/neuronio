import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from '@/entities/courses/course.entity';
import { CreateCourseDto } from 'shared';
import { Request } from 'express';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Get()
    getCourses(): string {
        return 'Hello from courses';
    }

    @Post('create')
    createCourses(@Body() course: CreateCourseDto): Promise<Course> {
        return this.coursesService.createCourses(course);
    }

    @Get('list/:id')
    getCoursesList(@Param('id') id: number): Promise<Course[]> {
        return this.coursesService.getCoursesList(id);
    }

    @Get('userCourses')
    getUserCourses(@Req() req: Request): Promise<Course[]> {
        return this.coursesService.getCoursesList(req.user.userId);
    }

    // Modules
    @Post('module')
    createModule(@Req() req: Request, @Body() body: object) {
        console.log(body)
        return this.coursesService.createModule(body)
    }
}