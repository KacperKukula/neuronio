import { Body, Controller, Post } from '@nestjs/common';
import { BlocksService } from './blocks.service';

@Controller('blocks')
export class BlocksController {
    constructor(private readonly blockService: BlocksService) {}
    
    @Post()
    async create(@Body() block: object) {
        const resp = await this.blockService.create(block);
    }
}
