import {
  Post,
  Body,
  Request,
  UseGuards,
  Controller,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'shared';
import { AuthGuard } from './auth.guard';
import { ValidationError } from "class-validator";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Request() req, @Body() loginDto: LoginDto) {
    const user = await this.authService.signIn(loginDto);
    if(!user) throw new UnauthorizedException('Invalid credentials')
    const { access_token } = this.authService.getJwtToken(user);
    return { user, access_token };
  }

  @Post('register')
  async register(@Request() req, @Body() body: RegisterDto) {
    const errors = await this.authService.register(body);
    return { errors };
  }
}