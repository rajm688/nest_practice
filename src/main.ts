// entry part of the program contains NestFactory which creates a new nest app instances

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interseptor';
import { Logger } from '@nestjs/common';
console.log(process.env.MYVAR);

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
  logger.log('Application Listining on port');
}
bootstrap();
