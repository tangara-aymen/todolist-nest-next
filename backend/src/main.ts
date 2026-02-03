import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://action.playsoft.io',
      'https://action.playsoft.io',
    ],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT ?? 4000;
  await app.listen(port);
}
bootstrap();