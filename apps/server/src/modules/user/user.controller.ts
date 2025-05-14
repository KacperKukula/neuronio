import { Controller, Get, Post, Body, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@/entities/user/user.entity';
import { AuthGuard } from '@/modules/auth/auth.guard';

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
    getUserByToken(@Request() req: Request): Promise<User> {
        //@ts-ignore
        const { password, ...user } =  this.userService.findOne(req.user.userId)
        return user;
    }

    @Post('searchForUsers')
    searchForUsers(@Body('search') search: string): Promise<User[]> {
        return this.userService.searchForUsers(search);
    }
}