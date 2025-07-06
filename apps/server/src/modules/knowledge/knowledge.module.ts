import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowledgeService } from './knowledge.service';
import { KnowledgeController } from './knowledge.controller';
import { Definition } from '@/entities/knowledge/definition.entity';
import { Course } from '@/entities/courses/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Definition, Course]),
  ],
  providers: [KnowledgeService],
  controllers: [KnowledgeController],
  // exports: [KnowledgeService]
})
export class KnowledgeModule {}