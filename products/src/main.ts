import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
      credentials: true,
      maxAge: 360,
      methods: "GET,OPTIONS,HEAD,PUT,PATCH,POST,DELETE",
      optionsSuccessStatus: 204,
      origin: true,
  });

  await app.listen(3000);
}
bootstrap();
