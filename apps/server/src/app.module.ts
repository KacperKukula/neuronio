import { MiddlewareConsumer, Module, NestModule, Req, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './conf/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { CoursesModule } from './modules/courses/courses.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '@modules/auth/auth.module';
import { AuthGuard } from '@/guards/auth.guard';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),

    /* Functional modules */
    UserModule,
    CoursesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  
    // Global auth guard
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}