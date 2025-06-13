import { Block } from '@/entities/courses/block.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class BlocksService {
    constructor(
        @InjectRepository(Block)
        private blockRepository: Repository<Block>,
        private coursesService: CoursesService
    ) {}

    async create(block: object) {
        const newBlock = await this.blockRepository.save(block)

        //@ts-ignore
        this.coursesService.pushBlockId(block.course, newBlock.id)
    }

    async updateBlockOrder(id: number, order: number): Promise<void> {
        await this.blockRepository.update(id, { order });
    }
}
