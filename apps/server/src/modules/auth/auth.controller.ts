import {
  Req,
  Post,
  Body,
  UseGuards,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'shared';
import { Request } from 'express';
import { RefreshAuthGuard } from '@/guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Req() req, @Body() loginDto: LoginDto) {
    const user = await this.authService.signIn(loginDto);
    if(!user) throw new UnauthorizedException('Invalid credentials')
    const { access_token } = this.authService.getJwtToken(user);
    const { refresh_token } = this.authService.getJwtRefreshToken(user);
    return { user, access_token, refresh_token };
  }

  @Post('register')
  async register(@Req() req, @Body() body: RegisterDto) {
    const errors = await this.authService.register(body);
    return { errors };
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refresh(@Req() req: Request) {
    return this.authService.refreshToken(req.user.userId);
  }
}