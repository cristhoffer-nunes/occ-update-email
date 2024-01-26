import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const logger = new Logger(bootstrap.name);
  await app.listen(port, () => {
    logger.log(`Service listening on port ${port}`);
  });
}
bootstrap();
