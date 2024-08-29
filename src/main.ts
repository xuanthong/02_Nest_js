import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1', { exclude: [''] });12345

  const port = configService.get('PORT');
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true, // bỏ những trường thoong tin thừa khi người dùng push lên
    forbidNonWhitelisted: true,
  }));

  await app.listen(port);
}
bootstrap();
