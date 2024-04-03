import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

async function initialiseAuthenticationServer() {
  config(); // ensuring that the environment variables setted up are consumed through the system
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

initialiseAuthenticationServer(); 