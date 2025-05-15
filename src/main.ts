import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Queue } from 'bullmq';
import { getQueueToken } from '@nestjs/bullmq';
import { setupBullBoard } from './mailQueue/bull-board';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Get the queue instance from Nest's DI
  const mailQueue = app.get<Queue>(getQueueToken('mailQueue'));

  // Pass the app and the BullMQ queue to bull-board setup
  setupBullBoard(app.getHttpAdapter().getInstance(), mailQueue);
  await app.listen(process.env.PORT);
}
bootstrap();
