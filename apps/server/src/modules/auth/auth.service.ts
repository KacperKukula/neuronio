import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "@modules/user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { User } from "@/entities/user/user.entity";
import { plainToInstance } from "class-transformer";
import { LoginDto, RegisterDto } from "shared";
import { validate, ValidationError } from "class-validator";
import { ConfigType } from "@nestjs/config";
import refreshJwtConfig from "@/conf/refresh-jwt.config";

const BCRYPT_PREFIXES = [ '$2b$', '$2a$' ]

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY) private refreshConfig: ConfigType<typeof refreshJwtConfig>
    ) {}
    
    async signIn(loginDto: LoginDto) {
        const user = await this.userService.findByName(loginDto.name);
        if (!user || await !bcrypt.compareSync(loginDto.password, user.password)) {
            return null;
        }
        const { password, ...result } = user;
        return result;
    }

    async register(registerDto: RegisterDto): Promise<ValidationError[]> {
        const errors = await validate(registerDto);
        if(!errors.length) {

            const password = bcrypt.hashSync(registerDto.password, 10)
            delete registerDto.password;

            const newUser = plainToInstance(User, { password, ...registerDto });
            await this.userService.create(newUser);
        }
        return errors
    }

    async refreshToken(userId: number) {
        const payload = { sub: userId }
        const token = this.jwtService.sign(payload)
        return { id: userId, token }
    }

    getJwtToken(user: any) {
        return {
            access_token: this.jwtService.sign(
                { username: user.email, sub: user.id },
                { expiresIn: '60s' }
            )
        }
    }

    getJwtRefreshToken(user: any) {
        return {
            refresh_token: this.jwtService.sign({ sub: user.id }, this.refreshConfig)
        }
    }

    isHashed(payload: string): boolean {
        return BCRYPT_PREFIXES.some(prefix => payload.startsWith(prefix))
    }
}