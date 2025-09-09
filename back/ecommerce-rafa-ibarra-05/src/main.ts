import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🧾 Logger personalizado
  app.use(LoggerGlobal);

  // ✅ Pipe global de validación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // recomendado para query params
      },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  // 🚀 Iniciar servidor
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
