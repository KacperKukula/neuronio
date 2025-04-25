import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@modules/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '@modules/user/user.service';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: 'i(kcewqibM78)PJ',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}
