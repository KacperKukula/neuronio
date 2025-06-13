import { UploadUtils } from "@/common/UploadUtils";
import { Block } from "@/entities/courses/block.entity";
import { Course } from "@/entities/courses/course.entity";
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
        private userRepository: Repository<User>,
        @InjectRepository(Block)
        private blockRepository: Repository<Block>
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
        });
    }

    async getCourseById(id: number): Promise<Course | null> {
        const course = await this.coursesRepository.findOne({
            where: { id },
            relations: ["owner", "participants"],
        });
        return course;
    }

    async pushBlockId(courseId: number, blockId: number): Promise<void> {
        const course = await this.coursesRepository.findOne({ where: { id: courseId } });
        if (!course) throw new BadRequestException('Course not found');
    }
    
    async getCourseBlocks(courseId: number): Promise<Block[]> {
        return await this.blockRepository.find({
            where: { course: { id: courseId } }
        });
    }

    async uploadBackground(file: Express.Multer.File, courseId: number): Promise<string> {
        let filePath = file.path;

        filePath = UploadUtils.backSlashToForwardSlash(filePath);
        filePath = UploadUtils.shedWhiteSpaces(filePath);

        await this.coursesRepository.update(courseId, { background: filePath });
        return filePath;
    }
}