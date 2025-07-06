import * as path from 'path';
import * as fs from 'fs';
import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from '@/entities/courses/course.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCourseDto } from 'shared';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { Block } from '@/entities/courses/block.entity';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Get()
    getCourses(): string {
        return 'Hello from courses';
    }

    //TODO: make more rest these endpoints
    @Get('get/:id')
    async getCourse(@Param('id', ParseIntPipe) id: number): Promise<Course> {
        const course = await this.coursesService.getCourseById(id);
        if (!course) {
            throw new NotFoundException(`Course with id ${id} not found`);
        }
        return course;
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
    async getUserCourses(@Req() req: Request): Promise<Course[]> {
        return await this.coursesService.getCoursesList(req.user.userId);
    }

    @Get('blocks/:id')
    async getCourseBlocks(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request
    ): Promise<Block[]> {
        return await this.coursesService.getCourseBlocks(id);
    }

    @Get('participants/:id')
    async getCourseParticipants(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.coursesService.getCourseParticipants(id);
    }

    @Put('participants/:id')
    async addParticipant(
        @Param('id', ParseIntPipe) id: number,
        @Body('userId', ParseIntPipe) userId: number,
    ) {
        return await this.coursesService.addParticipant(id, userId);
    }

    @Delete('participants/:id')
    async removeParticipant(
        @Param('id', ParseIntPipe) id: number,
        @Body('userId', ParseIntPipe) userId: number,
    ) {
        return await this.coursesService.removeParticipant(id, userId);
    }

    /* UPLOAD */
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                const courseId = req.query.courseId;
                if (!courseId) return cb(new Error('Course ID is required'), '');
                const uploadPath = `./uploads/courses/${courseId}`;
                fs.mkdirSync(uploadPath, { recursive: true });
                cb(null, `./uploads/courses/${courseId}`);
            },
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                const filename = `background${ext}`;
                cb(null, filename);
            }
        })
    }))
    async uploadBackground(
        @Req() req: Request,
        @UploadedFile() file: Express.Multer.File,
        @Query('courseId') courseId: number
    ): Promise<string>{
        if(!courseId) throw new NotFoundException('Course ID is required');
        return this.coursesService.uploadBackground(file, courseId);
    }
}