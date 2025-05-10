import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './modules/configs/env.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
   app.enableCors({
    origin: env.CLIENT_URL,
    credentials: true,
  });
  await app.listen(env.PORT ?? 3000);
}  
bootstrap();
   