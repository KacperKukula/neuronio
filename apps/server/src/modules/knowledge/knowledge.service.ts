import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Definition } from '@/entities/knowledge/definition.entity';
import { CreateDefinitionDto } from 'shared';
import { Course } from '@/entities/courses/course.entity';

@Injectable()
export class KnowledgeService {
    constructor(
        @InjectRepository(Definition) private definitionsRepository: Repository<Definition>,
        @InjectRepository(Course) private courseRepository: Repository<Course>
    ) {}

    getCourseDefinitions(courseId: string): Promise<Definition[]> {
        return this.definitionsRepository.find({
            where: { course: { id: Number(courseId) } },
            order: { keyword: 'ASC' },
        });
    }

    async createDefinition(newDefinition: CreateDefinitionDto): Promise<Definition> {
        const course = await this.courseRepository.findOne({ where: { id: newDefinition.courseId } });

        const definition = this.definitionsRepository.create({
            ...newDefinition,
            course: course,
        });
        return await this.definitionsRepository.save(definition);
    }

    async deleteDefinition(defId: number) {
        return this.definitionsRepository.delete(defId);
    }

    async getDefinitionsByIds(defs: number[]) {
        return this.definitionsRepository.find({
            where: { id: In(defs) }
        })
    }
}