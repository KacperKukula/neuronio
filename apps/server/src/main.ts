import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirebaseAuthGuard } from './modules/firebase-admin/FirebaseAuthGuard';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@/guards/auth.guard';
import * as express from 'express';

async function bootstrap() {  
  const app = await NestFactory.create(AppModule);

  // app.useGlobalGuards(new FirebaseAuthGuard());

  // TODO: Disable CORS in production
  // https://github.com/KacperKukula/3rainD/issues/4
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  app.use('/uploads', express.static('uploads'));

  /* Class validator pipes for DTOs */
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();