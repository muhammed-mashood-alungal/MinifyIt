import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './modules/configs/env.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
   app.enableCors({
    origin: 'http://localhost:5173', // your frontend origin
    credentials: true, // allow cookies if needed
  });
  await app.listen(env.PORT ?? 3000);
}  
bootstrap();
   