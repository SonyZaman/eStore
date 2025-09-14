import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for your frontend
  app.enableCors({
    origin: 'http://localhost:3001', // Allow requests from the frontend (Next.js running on port 3001)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, etc.)
  });

  await app.listen(3000); // Backend will run on port 3000
}
bootstrap();