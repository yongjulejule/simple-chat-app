import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SetupSwagger } from './swagger';
import * as cookie from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SetupSwagger(app);
  app.enableCors();
  app.use(cookie());
  await app.listen(4000);
}
bootstrap();
