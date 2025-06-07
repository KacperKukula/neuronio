import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@modules/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from '@modules/user/user.service';
import { ConfigModule } from '@nestjs/config';
import refreshJwtConfig from '@/conf/refresh-jwt.config';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import { RefreshAuthGuard } from '@/guards/refresh.guard';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: 'i(kcewqibM78)PJ',
            signOptions: { expiresIn: '1h' },
        }),
        ConfigModule.forFeature(refreshJwtConfig)
    ],
    providers: [AuthService, JwtStrategy, RefreshJwtStrategy, RefreshAuthGuard],
    controllers: [AuthController],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}
