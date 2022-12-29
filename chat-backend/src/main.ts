import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PerformanceInterceptor } from './performance/performance.interceptor';
import { SetupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SetupSwagger(app);
  app.enableCors();
  // app.useGlobalInterceptors(new PerformanceInterceptor());
  await app.listen(4000);
}
bootstrap();
