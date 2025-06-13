import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from "@/entities/courses/course.entity";
import { UserService } from '../user/user.service';
import { User } from '@/entities/user/user.entity';
import { Block } from '@/entities/courses/block.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([Course, User, Block]),
    ],
    providers: [ CoursesService ],
    controllers: [CoursesController]
})
export class CoursesModule {}