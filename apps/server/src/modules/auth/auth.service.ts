import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "@modules/user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { User } from "@/entities/user/user.entity";
import { plainToInstance } from "class-transformer";
import { LoginDto, RegisterDto } from "shared";
import { validate, ValidationError } from "class-validator";

const BCRYPT_PREFIXES = [ '$2b$', '$2a$' ]

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}
    
    async signIn(loginDto: LoginDto) {
        const user = await this.userService.findByName(loginDto.name);
        if (!user || !bcrypt.compare(loginDto.password, user.password)) {
            return null;
        }
        const { password, ...result } = user;
        return result;
    }

    async register(registerDto: RegisterDto): Promise<ValidationError[]> {
        const errors = await validate(registerDto);

        if(!errors.length) {
            const newUser = plainToInstance(User, registerDto);
            await this.userService.create(newUser);
        }
        return errors
    }

    getJwtToken(user: any) {
        return {
            access_token: this.jwtService.sign({ username: user.email, sub: user.id })
        }
    }

    isHashed(payload: string): boolean {
        return BCRYPT_PREFIXES.some(prefix => payload.startsWith(prefix))
    }
}