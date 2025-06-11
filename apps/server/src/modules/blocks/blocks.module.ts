import { Module } from '@nestjs/common';
import { BlocksController } from './blocks.controller';
import { Block } from '@/entities/courses/block.entity';
import { Course } from '@/entities/courses/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlocksService } from './blocks.service';
import { CoursesService } from '@modules/courses/courses.service';
import { User } from '@/entities/user/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Course, Block, User]),
    ],
    providers: [ BlocksService, CoursesService ],
    controllers: [BlocksController]
})
export class BlocksModule {}