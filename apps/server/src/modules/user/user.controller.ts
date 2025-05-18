import { Controller, Get, Post, Body, Param, Delete, Request, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@/entities/user/user.entity';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { UserProfile } from '@/entities/user/userProfile.entity';
import { UpdateUserProfileDto } from 'shared';

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
    async getUserByToken(@Request() req: Request): Promise<Omit<User, 'password'>> {
        
        //@ts-ignore
        const { password, ...user } = await this.userService.findOne(req.user.userId)
        return user;
    }

    @Post('searchForUsers')
    async searchForUsers(@Body('search') search: string): Promise<User[]> {
        return await this.userService.searchForUsers(search)
    }

    @Post('userPhoto')
    async getUserPhoto(@Request() req: Request): Promise<string> {
        //@ts-ignore
        return await this.userService.getUserPhoto(req.user.userId)
    }

    @Post('profile')
    async getUserProfile(@Request() req: Request): Promise<UserProfile | null> {
        //@ts-ignore
        return await this.userService.findProfileById(req.user.userId)
    }

    @Put('profile')
    async updateUserProfile(@Request() req: Request, @Body() dto: UpdateUserProfileDto): Promise<UserProfile | null> {
        //@ts-ignore
        return await this.userService.updateUserProfile(req.user.userId, dto);
    }
}