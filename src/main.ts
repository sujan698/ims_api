import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //app instance creatiopn/app instance is created
  const app = await NestFactory.create(AppModule);
  
  //all middlewares are rgistered here
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
