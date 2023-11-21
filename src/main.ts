import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Server is starting up!');
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Student Management')
    .setDescription('Student Management API description')
    .setVersion('1.0')
    .addTag('Student Management System')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
  logger.log(`Server started on http://localhost:${5000}/api`);
}
bootstrap();
