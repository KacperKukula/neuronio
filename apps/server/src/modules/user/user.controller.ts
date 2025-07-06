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
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { User } from '@/entities/user/user.entity';
import { AuthGuard } from '@/guards/auth.guard';
import { UserProfile } from '@/entities/user/userProfile.entity';
import { UpdateUserPreferencesDto, UpdateUserProfileDto } from 'shared';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<User> {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.userService.remove(id);
    }

    @Post('getCurrentUser')
    async getUserByToken(@Req() req: Request): Promise<Omit<User, 'password'>> {
        
        //@ts-ignore
        const { password, ...user } = await this.userService.findOne(req.user.userId)
        return user;
    }

    @Post('searchForUsers')
    async searchForUsers(@Body('search') search: string): Promise<User[]> {
        return await this.userService.searchForUsers(search)
    }

    @Post('userPhoto')
    async getUserPhoto(@Req() req: Request): Promise<string> {
        return await this.userService.getUserPhoto(req.user.userId)
    }

    @Post('profile')
    async getUserProfile(@Req() req: Request): Promise<UserProfile | null> {
        return await this.userService.findProfileById(req.user.userId)
    }

    @Put('profile')
    async updateUserProfile(@Req() req: Request, @Body() dto: UpdateUserProfileDto): Promise<UserProfile | null> {
        //@ts-ignore
        return await this.userService.updateUserProfile(req.user.userId, dto);
    }

    /* AVATAR */

    @Post('avatar')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/avatars',
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                const filename = `${req.user.userId}${ext}`;
                cb(null, filename);
            }
        })
    }))
    async uploadAvatar(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
        return this.userService.uploadAvatar(file, req.user.userId);
    }

    /* PREFERENCES */
    @Patch('preferences')
    async patchPreferences(@Req() req: Request, @Body() dto: UpdateUserPreferencesDto) {
        if (!dto || Object.keys(dto).length === 0) throw new Error('Preferences data is required');
        return await this.userService.savePreference(req.user.userId, dto);
    }
}