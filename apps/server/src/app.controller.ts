import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './modules/auth/auth.guard';
import { AppService } from '@/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postHello(): string {
    return this.appService.postHello();
  }

  @UseGuards(AuthGuard)
  @Get('test')
  test(): string {
    return 'Hello world';
  }
}