import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { BlocksService } from './blocks.service';

@Controller('blocks')
export class BlocksController {
    constructor(private readonly blockService: BlocksService) {}
    
    @Post()
    async create(@Body() block: object) {
        const resp = await this.blockService.create(block);
    }

    @Put(':id/order')
    async updateBlockOrder(
        @Param('id', ParseIntPipe) id: number,
        @Body('order') order: number
    ): Promise<void> {
        await this.blockService.updateBlockOrder(id, order);
    }

    @Delete(':id')
    async deleteBlock(@Param('id', ParseIntPipe) id) {
        await this.blockService.deleteBlock(id)
    }
}
