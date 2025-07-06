import {
    Req,
    Put,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Controller,
    UploadedFile,
    UseInterceptors,
    Patch,
    Query,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '@/entities/user/user.entity';
import { AuthGuard } from '@/guards/auth.guard';
import { UserProfile } from '@/entities/user/userProfile.entity';
import { CreateDefinitionDto, UpdateUserPreferencesDto, UpdateUserProfileDto } from 'shared';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { KnowledgeService } from './knowledge.service';
import { Definition } from '@/entities/knowledge/definition.entity';

@Controller('knowledge')
export class KnowledgeController {
    constructor(private readonly knowledgeService: KnowledgeService) {}

    @Get('definition/:id')
    async getCourseDefinitions(@Param('id') courseId: string,): Promise<Definition[]> {
        return await this.knowledgeService.getCourseDefinitions(courseId) ?? [];
    }

    @Post('definition')
    async createDefinition(@Body() createDefinition: CreateDefinitionDto): Promise<Definition> {
        return await this.knowledgeService.createDefinition(createDefinition);
    }

    @Delete('definition/:id')
    async deleteDefinition(@Param('id') defId: number) {
        return await this.knowledgeService.deleteDefinition(defId);
    }

    @Get('definitions')
    async getDefinitionsByIds(@Query('ids') ids: number[]|number): Promise<Definition[]> {
        if (!Array.isArray(ids)) ids = [ids];
        return await this.knowledgeService.getDefinitionsByIds(ids);
    }
}