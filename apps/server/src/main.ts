import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirebaseAuthGuard } from './modules/firebase-admin/FirebaseAuthGuard';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@modules/auth/auth.guard';

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

  /* Class validator pipes for DTOs */
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();