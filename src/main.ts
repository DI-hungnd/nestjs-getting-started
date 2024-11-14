import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '../utils';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips any properties that are not defined in the DTO
      // forbidNonWhitelisted: true, // Throws an error if any non-whitelisted properties are present
    }),
  );

  app.enableCors();

  await app.listen(config.get('PORT') ?? 3001);
}

bootstrap();
