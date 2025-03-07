import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirebaseAuthGuard } from './modules/firebase-admin/FirebaseAuthGuard';

async function bootstrap() {  
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new FirebaseAuthGuard());

  // TODO: Disable CORS in production
  // https://github.com/KacperKukula/3rainD/issues/4
  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();