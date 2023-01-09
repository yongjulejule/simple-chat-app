import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SetupSwagger } from './swagger';
import * as cookie from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: true,
  });
  SetupSwagger(app);
  app.enableCors({
    origin: 'http://localhost:3000',
    // origin: '*',
    credentials: true,
  });
  app.use(cookie());
  await app.listen(4000);
}
bootstrap();
